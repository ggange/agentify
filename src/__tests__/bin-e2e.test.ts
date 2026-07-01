import { describe, test, expect } from 'vitest';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distCli = path.resolve(__dirname, '../../dist/cli.js');

// Regression test for the ESM main-module guard. When telogen is invoked
// through a bin symlink (how `npx` and global installs work), process.argv[1]
// is the symlink path while import.meta.url is the resolved target. If the
// guard compares them raw, the CLI silently exits 0 without generating output.
// v0.1.0 shipped with this bug. This test runs the *built* binary through a
// symlink to prove auto-execution fires under real install conditions.
// Skips when dist/ is absent (bare `npm test` without a build). CI builds
// before testing, so this always runs in the pipeline that ships releases.
describe.skipIf(!existsSync(distCli))('bin auto-execution via symlink (built dist)', () => {
  test('generates llms.txt when invoked through a symlink', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'telogen-bin-'));
    const symlink = path.join(root, 'telogen-binlink.js');
    try {
      await fs.mkdir(path.join(root, 'app'), { recursive: true });
      await fs.writeFile(
        path.join(root, 'app', 'page.tsx'),
        `export const metadata = { title: 'Home', description: 'Welcome' };
         export default function Page() { return <main><h1>Welcome</h1></main>; }`,
        'utf-8'
      );

      // Mimic npm's bin symlink: symlink -> real dist/cli.js
      await fs.symlink(distCli, symlink);

      execFileSync(process.execPath, [symlink, '--out', 'out'], {
        cwd: root,
        stdio: 'pipe',
      });

      const llms = await fs.readFile(path.join(root, 'out', 'llms.txt'), 'utf-8');
      expect(llms).toContain('[Home](/index.md)');
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });
});
