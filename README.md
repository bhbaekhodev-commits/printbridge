# PrintBridge

> Web-to-Print module for converting web content to high-quality PDFs

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/bhbaekhodev-commits/printbridge?style=social)](https://github.com/bhbaekhodev-commits/printbridge/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/bhbaekhodev-commits/printbridge)](https://github.com/bhbaekhodev-commits/printbridge/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Problem Statement

When creating exhibition websites, a common pain point is converting web content to print-ready PDFs:

1. **Layout breaks** when converting web pages to PDF
2. **Manual work** required to adjust layouts for different paper sizes (A4, booklet, etc.)
3. **Text sizing** doesn't automatically fit within designated areas
4. **Repetitive process** for each page/exhibition

PrintBridge solves this by providing a flexible, reusable module that automatically fits web content to print layouts.

## Features

- **Automatic Text Fitting**: Adjusts font size to maximize text within designated areas
- **Smart Image Layout**: Supports multiple fit strategies (cover, contain, fill)
- **Multiple Page Formats**: A4, A5, Letter, Legal, Tabloid
- **Template System**: Pre-built templates with customization options
- **Framework Agnostic**: Core library works anywhere, with React components available
- **TypeScript First**: Fully typed API for great developer experience

## Quick Start

### Installation

```bash
# Core library (framework-agnostic)
npm install @printbridge/core

# React components
npm install @printbridge/react
```

### Basic Usage

```typescript
import { fitTextToArea } from '@printbridge/core';

const text = 'Your exhibition text here...';
const area = { x: 0, y: 0, width: 400, height: 600 };
const constraints = {
  minFontSize: 12,
  maxFontSize: 48,
  lineHeight: 1.5,
  fontFamily: 'Arial',
};

const result = fitTextToArea(text, area, constraints);
console.log(`Optimal font size: ${result.fontSize}pt`);
console.log(`Lines: ${result.lines.join('\n')}`);
```

## Project Structure

This is a monorepo managed with Turborepo:

```
printbridge/
├── packages/
│   ├── core/          # Core layout engine (framework-agnostic)
│   └── react/         # React components
├── apps/
│   └── demo/          # Next.js demo application
└── examples/
    └── exhibition-website/  # Real-world usage example
```

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/printbridge.git
cd printbridge

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Start demo app
npm run dev
```

### Commands

- `npm run build` - Build all packages
- `npm run dev` - Run all packages in development mode
- `npm run test` - Run tests across all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

## Roadmap

### Phase 1: MVP (Current)
- [x] Core text fitting algorithm
- [x] Image layout engine
- [x] Basic utilities (units, page sizes)
- [x] TypeScript types
- [ ] React components
- [ ] Demo application

### Phase 2: Templates
- [ ] A4 portrait/landscape templates
- [ ] Booklet template (2-up printing)
- [ ] Template customization UI
- [ ] Save/load layouts

### Phase 3: PDF Generation
- [ ] Client-side PDF generation (html2canvas + jsPDF)
- [ ] Server-side PDF generation (Puppeteer)
- [ ] High-quality output options
- [ ] Batch processing

### Phase 4: Advanced Features
- [ ] Collaborative editing
- [ ] Cloud storage integration
- [ ] i18n support
- [ ] Advanced typography controls

## 🎓 For Beginners (초보자 가이드)

코딩을 배우는 분들을 위한 쉬운 설명입니다.

### 📚 개발 용어 사전 (영어-한글-설명)

| 용어 | 한글 | 쉬운 설명 |
|------|------|----------|
| **Monorepo** | 모노레포 | 여러 프로젝트를 한 폴더에 모아둔 것 (레고 상자 하나에 여러 세트) |
| **TypeScript** | 타입스크립트 | JavaScript에 타입 체크 기능을 추가한 언어 (실수 방지 도우미) |
| **Package** | 패키지 | 재사용 가능한 코드 묶음 (요리 재료 키트) |
| **npm** | NPM | Node.js 라이브러리 저장소 (앱 스토어 같은 곳) |
| **Build** | 빌드 | 코드를 실행 가능한 형태로 변환 (요리 재료→완성된 음식) |
| **Test** | 테스트 | 코드가 제대로 작동하는지 확인 (맛보기) |
| **API** | API | 프로그램끼리 대화하는 방법 (메뉴판) |
| **Layout Engine** | 레이아웃 엔진 | 글자와 그림을 예쁘게 배치하는 시스템 (자동 정리 로봇) |
| **Git** | 깃 | 코드 변경 이력을 저장하는 도구 (타임머신) |
| **Repository** | 리포지토리 | 코드를 저장하는 장소 (코드 창고) |

---

### 🏗️ 프로젝트 구조 (5세 설명)

PrintBridge는 **레고 세트**처럼 구성되어 있어요!

```
printbridge/               🏠 큰 집
├── packages/             📦 레고 블록 보관함
│   ├── core/            🧱 기본 블록들 (텍스트, 이미지 배치)
│   └── react/           🎨 예쁜 꾸미기 블록들
├── apps/                🎮 완성된 장난감들
│   └── demo/            🖼️ 시범용 앱
└── examples/            📖 사용 설명서
```

**쉽게 말하면:**
- `packages/core`: 핵심 기능 (레고의 기본 블록)
- `packages/react`: 화면에 보이는 부분 (레고의 꾸미기 블록)
- `apps/demo`: 실제 사용 예시 (완성된 레고 작품)

---

### 💡 꼭 암기해야 할 결정적 지식

#### 1. **이 프로젝트가 하는 일 (한 문장)**
> "웹 페이지를 인쇄할 때 글자와 그림이 자동으로 딱 맞게 조절되도록 도와줘요"

#### 2. **핵심 기능 3가지**
1. **텍스트 자동 크기 조절** - 글자가 공간에 꽉 차게
2. **이미지 배치** - 사진이 예쁘게 들어가게
3. **PDF 생성** - 인쇄용 파일로 변환

#### 3. **파일을 수정할 때 규칙**
```
✅ 해도 되는 것:
- packages/core/src/ 안의 TypeScript 파일 수정
- README.md 문서 개선
- 테스트 추가

❌ 하면 안 되는 것:
- node_modules/ 절대 건드리지 마세요
- package-lock.json 수동으로 수정 금지
- dist/ 폴더는 자동 생성되는 곳
```

#### 4. **자주 쓰는 명령어 (외우면 좋아요)**
```bash
# 패키지 설치
npm install

# 빌드하기 (코드를 실행 가능하게)
npm run build

# 테스트 실행
npm run test

# 코드 변경사항 저장
git add .
git commit -m "설명"
git push
```

---

### 🎯 처음 시작하는 방법 (단계별)

#### Step 1: 프로젝트 다운로드
```bash
git clone https://github.com/bhbaekhodev-commits/printbridge.git
cd printbridge
```

#### Step 2: 재료 준비 (패키지 설치)
```bash
npm install
```
⏰ 3-5분 소요 (커피 한 잔 타임!)

#### Step 3: 빌드하기
```bash
npm run build
```
✅ 성공하면: "Build success" 메시지가 나와요

#### Step 4: 테스트하기
```bash
npm run test
```
✅ 성공하면: "7 passed" 같은 메시지

---

### 🚀 실전 예제 (따라 해보세요)

#### 예제 1: 텍스트 자동 크기 맞추기
```typescript
import { fitTextToArea } from '@printbridge/core';

// 1. 텍스트 준비
const myText = "안녕하세요! PrintBridge입니다.";

// 2. 공간 정하기 (가로 400, 세로 300)
const space = { x: 0, y: 0, width: 400, height: 300 };

// 3. 설정하기
const settings = {
  minFontSize: 12,  // 최소 글자 크기
  maxFontSize: 48,  // 최대 글자 크기
  lineHeight: 1.5,  // 줄 간격
  fontFamily: 'Arial'
};

// 4. 마법 발동! ✨
const result = fitTextToArea(myText, space, settings);

// 5. 결과 확인
console.log(`최적 글자 크기: ${result.fontSize}pt`);
console.log(`줄 수: ${result.lines.length}`);
```

**무슨 일이 일어났나요?**
- PrintBridge가 자동으로 글자 크기를 계산해줘요
- 공간에 딱 맞는 크기를 찾아줘요!

---

### 🎁 좋은 습관 (추천)

#### 1. **코드 작성 전에**
```bash
# 항상 최신 버전으로 업데이트
git pull

# 새 브랜치 만들기
git checkout -b my-feature
```

#### 2. **코드 작성 후에**
```bash
# 테스트 먼저!
npm run test

# 빌드 확인
npm run build

# 문제 없으면 저장
git add .
git commit -m "feat: 새 기능 추가"
git push
```

#### 3. **막힐 때 도움 받기**
- 🐛 버그 발견: [Issues](https://github.com/bhbaekhodev-commits/printbridge/issues)에 올리기
- 💬 질문: [Discussions](https://github.com/bhbaekhodev-commits/printbridge/discussions)에 물어보기
- 📚 문서: [CONTRIBUTING.md](CONTRIBUTING.md) 읽어보기

---

### 🎨 다음에 배울 것 (순서대로)

1. ✅ **완료**: 프로젝트 이해하기
2. 📖 **다음**: TypeScript 기초 배우기
3. 🎯 **그 다음**: 간단한 기능 추가해보기
4. 🚀 **나중에**: React 컴포넌트 만들기

**꿀팁:** 한 번에 하나씩! 천천히 해도 괜찮아요 😊

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

Created to solve real-world exhibition website printing challenges.

## Acknowledgments

- Inspired by the need for seamless web-to-print workflows
- Built with TypeScript, React, and Next.js
- Powered by Turborepo

---

**PrintBridge** - Bridging the gap between web and print.
