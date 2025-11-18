# 프레임워크 & 라이브러리 깊이 이해하기

> PrintBridge에서 사용하는 기술들을 집합론, 관계, 현상, 모순 관점에서 이해하기

---

## 📖 이 문서를 읽는 방법

각 프레임워크를 4가지 관점으로 분석합니다:

1. **🔷 집합론적 구조**: 계층, 포함 관계, 전체와 부분
2. **🔗 관계**: 다른 기술들과의 연결고리
3. **⚡ 현상**: 실제로 어떻게 작동하는가
4. **⚖️ 모순**: 장단점, 트레이드오프, 역설

---

## 1. Turborepo (모노레포 도구)

### 🔷 집합론적 구조

```
전체 코드베이스 (Universe)
├── 워크스페이스 A (Workspace A) ⊂ Universe
├── 워크스페이스 B (Workspace B) ⊂ Universe
└── 워크스페이스 C (Workspace C) ⊂ Universe

관계:
- A ∩ B = 공통 의존성 (shared dependencies)
- A ∪ B ∪ C = 전체 프로젝트
- 각 워크스페이스는 독립적이면서도 연결됨
```

**계층 구조:**
```
Turborepo (최상위 관리자)
  ↓
packages/ (패키지 집합)
  ├── @printbridge/core (원소 1)
  ├── @printbridge/react (원소 2)
  └── ...
  ↓
각 패키지의 의존성 (하위 집합)
```

**포함 관계:**
- `@printbridge/react` ⊃ `@printbridge/core` (react가 core를 포함)
- 모든 패키지 ⊂ 루트 프로젝트
- 공통 설정 ⊃ 개별 설정

---

### 🔗 관계

**수평 관계 (형제):**
```
npm workspaces ↔ Turborepo (대체 가능)
Lerna ↔ Turborepo (경쟁 관계)
pnpm workspaces ↔ Turborepo (상호 보완)
```

**수직 관계 (계층):**
```
프로젝트 관리
    ↓
  Turborepo (상위)
    ↓
  npm/pnpm (하위)
    ↓
  패키지 설치
```

**의존 관계:**
```
Turborepo → Node.js (필수)
Turborepo → package.json (필수)
Turborepo → Git (선택)
```

---

### ⚡ 현상

**실제 작동 방식:**
1. `npm run build` 실행
2. Turborepo가 의존성 그래프 분석
3. 병렬로 실행 가능한 작업 탐지
4. 캐시 확인 (변경되지 않았으면 스킵)
5. 최적 순서로 빌드 실행

**관찰 가능한 현상:**
- 두 번째 빌드가 첫 번째보다 훨씬 빠름 (캐싱)
- 여러 패키지가 동시에 빌드됨 (병렬화)
- 변경된 패키지만 재빌드됨 (증분 빌드)

---

### ⚖️ 모순

**역설 1: 단순함 vs 복잡함**
- Turborepo는 "단순한" 도구를 표방
- 하지만 모노레포 자체가 복잡한 개념
- → 복잡함을 숨기기 위해 간단한 인터페이스 제공

**역설 2: 독립성 vs 의존성**
- 각 패키지는 "독립적"이어야 함
- 동시에 서로 "의존"함
- → 느슨한 결합(Loose Coupling) 추구

**트레이드오프:**
- ✅ 장점: 코드 재사용, 일관성, 효율적 빌드
- ❌ 단점: 초기 설정 복잡, 학습 곡선, 도구 의존성

**언제 쓰지 말아야 하나:**
- 패키지가 1-2개뿐일 때
- 팀이 매우 작을 때 (혼자)
- 빌드 시간이 중요하지 않을 때

---

## 2. TypeScript

### 🔷 집합론적 구조

```
JavaScript 집합 (전체 집합)
  ↓
TypeScript ⊂ JavaScript의 상위집합
  ↓
TypeScript = JavaScript + 타입 시스템

타입 계층:
any (모든 타입의 상위집합)
  ↓
unknown (안전한 any)
  ↓
구체적 타입 (number, string, object)
  ↓
리터럴 타입 ("hello", 42)
  ↓
never (공집합)
```

**타입의 포함 관계:**
```
type Animal = { name: string }
type Dog = Animal & { bark: () => void }

Dog ⊂ Animal (Dog는 Animal의 부분집합)
```

**교집합과 합집합:**
```typescript
type A = { x: number };
type B = { y: number };

type AB = A & B;  // 교집합 (둘 다 가져야 함)
type AorB = A | B; // 합집합 (둘 중 하나)
```

---

### 🔗 관계

**컴파일 관계:**
```
TypeScript (소스) → tsc (컴파일러) → JavaScript (결과)
```

**생태계 관계:**
```
TypeScript ↔ VS Code (강한 통합)
TypeScript ↔ React (널리 사용)
TypeScript → @types/* (타입 정의)
```

**경쟁 관계:**
```
TypeScript vs Flow (Facebook)
TypeScript vs JSDoc (주석 기반)
TypeScript vs ReScript (다른 접근)
```

---

### ⚡ 현상

**컴파일 타임 현상:**
```typescript
// 작성 시점
const x: number = "hello"; // ❌ 에러 발생 (아직 실행 전)

// 실행 시점
const y = "hello"; // ✅ JavaScript로 변환되어 실행
```

**타입 추론 현상:**
```typescript
let x = 42;  // TypeScript가 자동으로 number로 추론
x = "hello"; // ❌ 에러 (이미 number로 결정됨)
```

**구조적 타이핑 현상:**
```typescript
interface Point { x: number; y: number; }
interface Coordinate { x: number; y: number; }

let p: Point = { x: 1, y: 2 };
let c: Coordinate = p; // ✅ 구조가 같으면 호환됨!
```

---

### ⚖️ 모순

**역설 1: 안전함 vs 유연함**
- 타입 시스템은 "안전"을 추구
- JavaScript는 "유연함"을 특징으로 함
- → `any`, `unknown` 같은 탈출구 제공

**역설 2: 컴파일 타임 vs 런타임**
```typescript
const x: number = 42;
// 컴파일 타임: number 타입
// 런타임: 타입 정보 사라짐 (그냥 42)
```

**트레이드오프:**
- ✅ 장점: 에러 조기 발견, IDE 지원, 리팩토링 안전
- ❌ 단점: 학습 곡선, 빌드 단계 필요, 타이핑 오버헤드

**언제 안 써도 되나:**
- 매우 작은 스크립트 (10줄 이하)
- 프로토타이핑 단계
- 레거시 프로젝트에 추가하기 어려울 때

---

## 3. React

### 🔷 집합론적 구조

```
React 앱 (Universe)
  ↓
컴포넌트 트리 (Tree Structure)
  ├── <App /> (루트)
  │   ├── <Header /> (자식)
  │   ├── <Main /> (자식)
  │   │   ├── <Article /> (손자)
  │   │   └── <Sidebar /> (손자)
  │   └── <Footer /> (자식)

계층 관계:
- 부모 컴포넌트 ⊃ 자식 컴포넌트
- Props는 위→아래로만 흐름 (단방향)
- State는 컴포넌트 내부에 캡슐화
```

**상태 관리 집합:**
```
전체 앱 상태
  ├── 컴포넌트 로컬 상태 (useState)
  ├── 공유 상태 (Context)
  └── 전역 상태 (Redux, Zustand)

관계: 로컬 ⊂ 공유 ⊂ 전역
```

---

### 🔗 관계

**생태계 관계:**
```
React (View만 담당)
  ↓
필요한 것들:
  - 라우팅 → React Router
  - 상태 관리 → Redux/Zustand
  - 스타일링 → CSS-in-JS
  - 빌드 → Vite/Next.js
```

**프레임워크 관계:**
```
React ↔ Vue (경쟁)
React ↔ Angular (경쟁)
React → Preact (경량 대안)
React → Next.js (상위 프레임워크)
```

---

### ⚡ 현상

**렌더링 현상:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log("렌더링!"); // State 변경 시마다 실행

  return <button onClick={() => setCount(count + 1)}>
    {count}
  </button>
}

관찰:
1. 클릭 → setCount 호출
2. State 변경 감지
3. 컴포넌트 재렌더링
4. 가상 DOM 비교
5. 실제 DOM 업데이트 (필요한 부분만)
```

**클로저 현상:**
```jsx
function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      console.log(count); // 클릭 당시의 count 값 (클로저)
    }, 3000);
  };

  return <button onClick={handleClick}>Click</button>
}
```

---

### ⚖️ 모순

**역설 1: 선언적 vs 명령적**
- React는 "선언적" 프로그래밍
- 하지만 useEffect는 "명령적"
- → 두 패러다임의 혼합

**역설 2: 불변성 강조 vs JavaScript의 가변성**
```javascript
// React는 불변성을 원함
const [arr, setArr] = useState([1, 2, 3]);
setArr([...arr, 4]); // ✅ 새 배열 생성

// 하지만 JavaScript는 가변적
arr.push(4); // ❌ React가 감지 못함
```

**트레이드오프:**
- ✅ 장점: 컴포넌트 재사용, 가상 DOM 효율, 큰 생태계
- ❌ 단점: 학습 곡선, 보일러플레이트, 런타임 오버헤드

---

## 4. Vitest (테스트 프레임워크)

### 🔷 집합론적 구조

```
테스트 스위트 (Suite)
  ├── describe("그룹 1") ⊃ 여러 테스트
  │   ├── it("테스트 1")
  │   ├── it("테스트 2")
  │   └── it("테스트 3")
  └── describe("그룹 2")
      └── it("테스트 4")

계층:
- Suite ⊃ Group ⊃ Test
- 각 테스트는 독립적 (교집합 없음)
```

**검증의 집합:**
```
모든 가능한 입력 (Input Space)
  ↓
테스트 케이스 (Sampled Inputs) ⊂ Input Space
  ↓
통과한 케이스 ⊂ 테스트 케이스
```

---

### 🔗 관계

**Jest와의 관계:**
```
Vitest ≈ Jest (API 호환)
Vitest > Jest (속도, Vite 통합)
Jest > Vitest (성숙도, 생태계)
```

**빌드 도구와의 관계:**
```
Vitest ↔ Vite (강한 결합)
Jest ↔ Webpack (전통적 조합)
```

---

### ⚡ 현상

**테스트 실행 현상:**
```typescript
describe('fitTextToArea', () => {
  it('should fit text', () => {
    const result = fitTextToArea(text, area, constraints);
    expect(result.overflow).toBe(false);
  });
});

실행 과정:
1. describe 블록 진입
2. it 함수 실행
3. 함수 호출
4. expect로 검증
5. 통과/실패 판정
6. 리포트 생성
```

**Watch 모드 현상:**
```
파일 저장
  ↓
Vitest가 변경 감지
  ↓
관련 테스트만 재실행 (증분)
  ↓
결과 즉시 표시
```

---

### ⚖️ 모순

**역설 1: 빠름 vs 정확함**
- 빠른 피드백을 원함
- 동시에 모든 케이스를 테스트하고 싶음
- → 병렬 실행, 스마트 필터링으로 해결

**역설 2: 단위 테스트 vs 통합 테스트**
```
단위 테스트: 빠르지만 현실과 거리가 있음
통합 테스트: 현실적이지만 느림
→ 피라미드 구조로 균형
```

---

## 5. 비교표: 언제 무엇을 쓸까?

### 모노레포 도구

| 도구 | 사용 시기 | 피해야 할 때 |
|------|----------|-------------|
| **Turborepo** | 여러 패키지, 빌드 최적화 필요 | 패키지 1-2개, 간단한 프로젝트 |
| **Lerna** | npm 배포 중심 | 빌드 속도 중요 |
| **npm workspaces** | 단순한 구조 | 복잡한 빌드 파이프라인 |

### 타입 시스템

| 도구 | 사용 시기 | 피해야 할 때 |
|------|----------|-------------|
| **TypeScript** | 중대형 프로젝트, 팀 협업 | 소규모 스크립트 |
| **JSDoc** | 기존 JS 프로젝트 | 새 프로젝트 |
| **Flow** | Meta 생태계 | 일반 프로젝트 |

### 테스트 프레임워크

| 도구 | 사용 시기 | 피해야 할 때 |
|------|----------|-------------|
| **Vitest** | Vite 사용, 빠른 피드백 | Webpack 중심 |
| **Jest** | 성숙한 생태계 필요 | 속도 중요 |
| **Mocha** | 유연성 필요 | 빠른 시작 원함 |

---

## 💡 결정적 통찰

### 1. 모든 도구는 트레이드오프
```
성능 ↔ 유연성
안전 ↔ 자유
단순 ↔ 강력
```

### 2. 집합론적 사고의 힘
```
문제: "이 라이브러리 쓸까?"
→ "내 요구사항 집합 ⊂ 라이브러리 기능 집합?"
→ "라이브러리 의존성 ∩ 기존 의존성 = ?"
```

### 3. 관계 이해가 선택을 결정
```
A와 B가 경쟁 관계 → 둘 중 하나 선택
A와 B가 보완 관계 → 함께 사용
A → B 의존 관계 → A 쓰려면 B 필수
```

### 4. 현상 관찰이 디버깅의 시작
```
예상과 다르게 동작?
→ 실제 현상 관찰
→ 내부 동작 원리 이해
→ 원인 파악
→ 해결
```

---

## 🎯 이 문서 활용법

### 새 프레임워크를 배울 때:

1. **집합론적 구조** 먼저 파악
   - 전체와 부분은 무엇인가?
   - 계층은 어떻게 되는가?

2. **관계** 이해
   - 무엇과 경쟁하는가?
   - 무엇에 의존하는가?

3. **현상** 관찰
   - 실제로 어떻게 동작하는가?
   - 내부 원리는?

4. **모순** 인식
   - 어떤 트레이드오프가 있는가?
   - 언제 쓰면 안 되는가?

---

## 📚 더 깊이 배우기

각 기술의 공식 문서:
- [Turborepo](https://turbo.build/repo)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vitest](https://vitest.dev/)

철학적 배경:
- 집합론: [Set Theory for Programmers](https://en.wikipedia.org/wiki/Set_theory)
- 타입 이론: [Type Theory](https://en.wikipedia.org/wiki/Type_theory)
- 함수형 프로그래밍: [FP Concepts](https://en.wikipedia.org/wiki/Functional_programming)

---

**이 문서는 계속 업데이트됩니다.** 새로운 프레임워크를 추가하거나 기존 설명을 개선하는 PR을 환영합니다!
