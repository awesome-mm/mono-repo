### 파편화 프로젝트통합 - 모노레포 프론트엔드 환경, pnpm, 공통 디자인 시스템을 적용하자

---
1. 기존에 파편화된 프로젝트들을 통합
2. 각 프로젝트의 컨벤션을 통합한다. [ eslint, prettier, jscofig, 등 ]
3. 같은 node 버전, react 버전을 사용함으로써 컨테이너화 하기 위함
4. 새로운 프로젝트를 만들 때 같은 세팅을 매번 해줘야하는 불편함을 개선
5. 하나의 레포지토리로 관리를 해야하기에 빌드 시 다른 프로젝트 파일까지 빌드되면 안되기 때문에 캐싱이 필요하여 turborepo를 사용한다
6. 패키지 버전관리와 빌드 속도의 장점이 있는 pnpm을 사용한다.
7. svgr 버전이 달라서 .svg와 .svg?react를 프로젝트마다 혼용하여 사용하였는데, 이것을 개선하고자 vite config에서 withFilter의 정규식을 사용하여 해결한다.
8. React + Webpack + CRACO의 프로젝트를 vite로 마이그레이션한다
9. 신규 생성된 vite에 e2e 테스트 환경을 구축하기 위해 playwright를 추가한다
10. 빌드 시 env 분기처리가 필요하다. 각 프로젝트마다 prod, dev, qa ( stage )가 존재하고 있다 
11. ~ 부터는 회사 코드가 들어가서 비공개 레포지토리로 다시 시작하겠따

turborepo 생성
'''
  npx create-turbo@latest
'''

apps안에 react vite 생성
'''
  cd ./apps
  pnpm create vite@latest vite-app
'''


vite config
'''
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { withFilter } from '@rollup/pluginutils'

plugins: [
    withFilter(
      svgr({ /* 옵션 */ }),
      {
        load: {
          // 모든 .svg .svgr 파일을 필터 처리
          id: /\.svg(\?react)?$/
        }
      }
    )
  ]
'''
