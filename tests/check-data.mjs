// Checks that the lesson index, lesson bodies, subjects and software data agree with each other and with the site's rules.
import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (file, globals = {}) => {
  const context = {...globals};
  context.window = context;
  vm.createContext(context);
  vm.runInContext(readFileSync(join(root, file), 'utf8'), context, {filename: file});
  return context;
};

const index = load('data/lessons-index.js').RT_LESSON_INDEX;
const subjects = load('data/subjects.js').RT_SUBJECTS;
const daws = load('data/daws.js').RT_DAWS;
const subjectIds = new Set(subjects.subjects.map(subject => subject.id));
const dawIds = new Set(daws.map(daw => daw.id));
const problems = [];
const seen = new Set();

for (const entry of index) {
  if (seen.has(entry.id)) problems.push(`duplicate id ${entry.id}`);
  seen.add(entry.id);
  const file = `data/lessons/${entry.id}.js`;
  if (!existsSync(join(root, file))) {
    problems.push(`${entry.id}: missing ${file}`);
    continue;
  }
  const body = load(file).RT_LESSON_BODY;
  if (!body) {
    problems.push(`${entry.id}: ${file} did not set RT_LESSON_BODY`);
    continue;
  }
  for (const key of ['id', 'title', 'skill', 'level', 'time', 'summary']) {
    if (body[key] !== entry[key]) problems.push(`${entry.id}: ${key} differs between index and body`);
  }
  if (body.course.id !== entry.course.id || body.course.name !== entry.course.name) problems.push(`${entry.id}: course differs`);
  if (entry.course.kind === 'subject' && !subjectIds.has(entry.course.id)) problems.push(`${entry.id}: unknown subject ${entry.course.id}`);
  for (const subject of entry.subjects) if (!subjectIds.has(subject)) problems.push(`${entry.id}: unknown subject ${subject}`);
  const bodyDaws = body.steps ? Object.keys(body.steps).sort().join(',') : '';
  if (bodyDaws !== [...entry.daws].sort().join(',')) problems.push(`${entry.id}: daws differ between index and steps`);
  for (const daw of entry.daws) if (!dawIds.has(daw)) problems.push(`${entry.id}: unknown software ${daw}`);
  for (const ref of [body.nav.prev, body.nav.next]) {
    if (ref && !index.some(other => other.id === ref.id)) problems.push(`${entry.id}: nav points to missing ${ref.id}`);
  }
  if (!body.objectives?.length || !body.concept || !body.exercise || !body.mistake) problems.push(`${entry.id}: missing lesson section text`);
  const media = [body.media, ...Object.values(body.dawMedia || {})].filter(Boolean);
  for (const item of media) if (!/^[A-Za-z0-9_-]{11}$/.test(item.video)) problems.push(`${entry.id}: video id looks malformed (${item.video})`);
  for (const link of body.resourceLinks || []) if (!/^https:\/\//.test(link.url)) problems.push(`${entry.id}: non-https link ${link.url}`);
}

for (const file of readdirSync(join(root, 'data/lessons'))) {
  if (!seen.has(file.replace(/\.js$/, ''))) problems.push(`orphan body file data/lessons/${file}`);
}
for (const daw of daws) {
  if (!/^https:\/\//.test(daw.official) || !/^https:\/\//.test(daw.docs)) problems.push(`${daw.id}: official and docs links must be https`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Data is consistent: ${index.length} lessons, ${subjects.subjects.length} subjects, ${daws.length} software entries.`);
