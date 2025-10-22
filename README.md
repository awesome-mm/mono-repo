### 파편화 프로젝트 통합: 모노레포 프론트엔드 환경 구축

---

## 목표

1. 기존에 파편화된 프로젝트들을 **통합**
2. 각 프로젝트의 컨벤션을 통합 (`eslint`, `prettier`, `jsconfig` 등)
3. **같은 Node.js 버전, React 버전 사용** → 컨테이너화 및 환경 일관성 확보
4. 새로운 프로젝트 생성 시 반복적인 설정 작업 제거
5. **Turborepo를 활용**하여 빌드 시 다른 프로젝트 파일까지 불필요하게 빌드되는 문제 방지 및 캐싱 적용
6. **pnpm 사용** → 패키지 버전 관리와 빌드 속도 향상
7. `.svg`와 `.svg?react` 혼용 문제 개선 → `vite-plugin-svgr`와 `withFilter` 사용
8. 기존 **React + Webpack + CRACO 프로젝트 → Vite로 마이그레이션**
9. 신규 Vite 프로젝트에 **Playwright를 이용한 E2E 테스트 환경 구축**
10. **빌드 시 환경 분기 처리**: `prod`, `dev`, `qa(stage)` 적용
11. 이후부터는 **회사 코드 적용** → 비공개 레포지토리로 재구성
12. 글로벌 설정을 위해 .prettierrc.js, .eslintrc.js .vscode/setting.json root에 지정
13. 공통 ui IntelliSense 기능 추가 (자동완성)
14. 이후부터는 회사 코드 적용 → 비공개 레포지토리로 재구성

---

## Turborepo 생성

```bash
npx create-turbo@latest
```

## apps안에 react vite 생성

```bash
  cd ./apps
  pnpm create vite@latest vite-app
```

## apps안에 프로젝트 실행

```bash
pnpm --filter [프로젝트명] start:dev
```

## Vite Config (Webpack + CRACO 프로젝트 마이그레이션용)

```ts
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { withFilter } from "@rollup/pluginutils";

plugins: [
  withFilter(
    svgr({
      /* 옵션 */
    }),
    {
      load: {
        // 모든 .svg .svgr 파일을 필터 처리
        id: /\.svg(\?react)?$/,
      },
    },
  ),
];
```
