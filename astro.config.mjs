// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import packageJson from './package.json' with { type: 'json' };

const getGitCommit = () => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'dev';
  }
};

const appVersion = process.env.APP_VERSION || packageJson.version;
const buildCommit = process.env.BUILD_COMMIT || getGitCommit();
const buildDate = process.env.BUILD_DATE || new Date().toISOString();

/**
 * Rehype 플러그인: 마크다운 파서(CommonMark)가 닫는 괄호 뒤 한글 조사(예: **비밀번호(4자리)**를, **[링크](url)**로 등)로 인해
 * 볼드로 변환하지 못하고 평문으로 남겨둔 모든 `**...**` 패턴을 완벽하게 <strong> 태그로 자동 변환합니다.
 */
function rehypeKoreanMarkdownBold() {
  return (tree) => {
    function visit(node) {
      if (!node || !node.children) return;
      if (node.tagName === 'code' || node.tagName === 'pre') return;

      // 자식 노드 먼저 재귀 순회 (Bottom-up)
      for (const child of node.children) {
        visit(child);
      }

      // 1단계: 형제 엘리먼트(예: <a> 링크)를 감싸고 있는 `**` + <element> + `**` 패턴 처리
      const mergedChildren = [];
      for (let i = 0; i < node.children.length; i++) {
        const curr = node.children[i];
        const next = node.children[i + 1];
        const next2 = node.children[i + 2];
        if (
          curr &&
          curr.type === 'text' &&
          curr.value &&
          /\*\*\s*$/.test(curr.value) &&
          next &&
          next.type === 'element' &&
          next2 &&
          next2.type === 'text' &&
          next2.value &&
          /^\s*\*\*/.test(next2.value)
        ) {
          curr.value = curr.value.replace(/\*\*\s*$/, '');
          if (curr.value) mergedChildren.push(curr);
          mergedChildren.push({
            type: 'element',
            tagName: 'strong',
            properties: {},
            children: [next],
          });
          next2.value = next2.value.replace(/^\s*\*\*/, '');
          i += 1; // next 건너뛰기
          continue;
        }
        mergedChildren.push(curr);
      }
      node.children = mergedChildren;

      // 2단계: 단일 텍스트 노드 내 남아있는 `**텍스트**` 패턴 변환
      const newChildren = [];
      for (const child of node.children) {
        if (child.type === 'text' && child.value && child.value.includes('**')) {
          const regex = /\*\*([^*\n]+?)\*\*/g;
          let lastIndex = 0;
          let match;
          let hasMatch = false;
          while ((match = regex.exec(child.value)) !== null) {
            hasMatch = true;
            if (match.index > lastIndex) {
              newChildren.push({ type: 'text', value: child.value.slice(lastIndex, match.index) });
            }
            newChildren.push({
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [{ type: 'text', value: match[1] }],
            });
            lastIndex = regex.lastIndex;
          }
          if (hasMatch) {
            if (lastIndex < child.value.length) {
              newChildren.push({ type: 'text', value: child.value.slice(lastIndex) });
            }
          } else {
            newChildren.push(child);
          }
        } else {
          newChildren.push(child);
        }
      }
      node.children = newChildren;
    }
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://map.dongholab.com',
  // base path 제거 - 루트에서 서빙
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeKoreanMarkdownBold],
  },
  vite: {
    define: {
      'import.meta.env.PUBLIC_APP_VERSION': JSON.stringify(appVersion),
      'import.meta.env.PUBLIC_BUILD_COMMIT': JSON.stringify(buildCommit),
      'import.meta.env.PUBLIC_BUILD_DATE': JSON.stringify(buildDate),
    },
  },
});
