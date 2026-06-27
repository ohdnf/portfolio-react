import type {
  ArchitectureDiagram,
  FlowDiagram,
  Profile,
  Project,
  SchemaGroup,
  TimelineItem,
} from '../types'

export const profile: Profile = {
  name: '홍주표',
  title: '6년차 백엔드 엔지니어 / 홍주표입니다.',
  summary:
    '라오스 모빌리티 플랫폼과 슈퍼앱 백엔드의 초기 설계, 데이터 모델링, API 설계/개발, 외부 결제·POS 연동, AWS 기반 운영 안정화를 담당했습니다. 요구사항이 빠르게 변하는 스타트업 환경에서 서비스 구조를 정리하고, 출시 이후 운영 이슈를 데이터와 인프라 관점에서 개선해왔습니다.',
  focus: [
    'Node.js, TypeScript, NestJS 기반 백엔드 개발',
    'ERD 기반 데이터베이스 설계와 트랜잭션 경계 정리',
    '결제, 정산, 모빌리티, 주문, 예약 도메인 API 설계',
    'AWS ECS/ECR/S3/CDK, Docker, GitHub Actions 기반 배포 자동화',
    '외부 협력사와 영어 커뮤니케이션 및 API 연동 테스트 조율',
  ],
  metrics: [
    {
      label: 'Experience',
      value: '6년차',
      caption: '백엔드 개발 및 플랫폼 리딩',
      tone: 'slate',
    },
    {
      label: 'KOKKOK Move',
      value: '70만+',
      caption: '2025년 말 기준 누적 다운로드',
      tone: 'blue',
    },
    {
      label: 'Registered Users',
      value: '45만+',
      caption: 'KOKKOK Move 가입자',
      tone: 'teal',
    },
    {
      label: 'Daily Mobility',
      value: '약 1만',
      caption: '일일 운행 요청, 약 3천 건 운행',
      tone: 'amber',
    },
  ],
}

const kokkokAppArchitecture: ArchitectureDiagram = {
  title: 'KOKKOK 백엔드 애플리케이션 구조',
  description:
    '사용자 타입별 API 서버를 분리하고, 공통 라이브러리 계층으로 데이터베이스, 결제, POS, 캐시, 스토리지, 관측성을 재사용하는 구조입니다.',
  groups: [
    { id: 'clients', label: 'Client Surface', x: 28, y: 40, width: 188, height: 380 },
    { id: 'apis', label: 'Backend Apps', x: 264, y: 40, width: 200, height: 380 },
    { id: 'libs', label: 'Common Libraries', x: 520, y: 94, width: 166, height: 270 },
    { id: 'systems', label: 'Data / External Systems', x: 742, y: 40, width: 190, height: 388 },
  ],
  nodes: [
    { id: 'customer-app', label: 'Customer\nApp', x: 58, y: 92, tone: 'blue' },
    { id: 'admin-web', label: 'Admin\nWeb', x: 58, y: 164, tone: 'slate' },
    { id: 'courier-app', label: 'Courier\nApp', x: 58, y: 236, tone: 'teal' },
    { id: 'store-app', label: 'Store\nApp', x: 58, y: 308, tone: 'amber' },
    { id: 'partner', label: 'Partners', detail: 'POS Partner', x: 58, y: 380, tone: 'slate' },
    { id: 'customer-api', label: 'customer\nAPI', x: 294, y: 92, tone: 'blue' },
    { id: 'admin-api', label: 'admin\nAPI', x: 294, y: 164, tone: 'slate' },
    { id: 'courier-api', label: 'courier\nAPI', x: 294, y: 236, tone: 'teal' },
    { id: 'store-api', label: 'store\nAPI', x: 294, y: 308, tone: 'amber' },
    { id: 'openapi', label: 'openapi', detail: 'partner API', x: 294, y: 380, tone: 'slate' },
    { id: 'common', label: 'Domain & Infra\nLibraries', detail: 'database / payment / pos / redis', x: 544, y: 190, width: 118, height: 90, tone: 'teal' },
    { id: 'mariadb', label: 'MariaDB', detail: 'primary replica', x: 766, y: 72, width: 118, height: 56, tone: 'blue' },
    { id: 'docdb', label: 'DocumentDB', detail: 'document data', x: 766, y: 130, width: 118, height: 56, tone: 'teal' },
    { id: 'cache', label: 'Redis / Valkey', detail: 'cache lock', x: 766, y: 188, width: 118, height: 56, tone: 'amber' },
    { id: 'storage', label: 'AWS S3', detail: 'files env', x: 766, y: 246, width: 118, height: 56, tone: 'slate' },
    { id: 'payment', label: '라오스 결제\n플랫폼', x: 766, y: 304, width: 118, height: 56, tone: 'blue' },
    { id: 'pos', label: 'POS 시스템\n협력사', x: 766, y: 362, width: 118, height: 56, tone: 'teal' },
  ],
  edges: [
    { from: 'customer-app', to: 'customer-api' },
    { from: 'admin-web', to: 'admin-api' },
    { from: 'courier-app', to: 'courier-api' },
    { from: 'store-app', to: 'store-api' },
    { from: 'partner', to: 'openapi' },
    { from: 'customer-api', to: 'common' },
    { from: 'admin-api', to: 'common' },
    { from: 'courier-api', to: 'common' },
    { from: 'store-api', to: 'common' },
    { from: 'openapi', to: 'common' },
    { from: 'common', to: 'mariadb' },
    { from: 'common', to: 'docdb' },
    { from: 'common', to: 'cache' },
    { from: 'common', to: 'storage' },
    { from: 'common', to: 'payment' },
    { from: 'common', to: 'pos' },
  ],
}

const kokkokAwsArchitecture: ArchitectureDiagram = {
  title: 'AWS CDK 기반 배포 구조',
  description:
    '백엔드 이미지 빌드와 인프라 배포를 분리하고, 앱별 ECS 런타임과 스케줄러를 CDK로 관리하는 핵심 흐름을 요약했습니다.',
  groups: [
    { id: 'source', label: 'Source / CI', x: 28, y: 40, width: 214, height: 316 },
    { id: 'iac', label: 'IaC Control Plane', x: 296, y: 40, width: 206, height: 316 },
    { id: 'runtime', label: 'AWS Runtime', x: 558, y: 40, width: 374, height: 316 },
  ],
  nodes: [
    { id: 'backend-repo', label: 'Backend\nRepository', x: 58, y: 100, tone: 'slate' },
    { id: 'actions', label: 'GitHub\nActions OIDC', x: 58, y: 184, tone: 'blue' },
    { id: 'ecr', label: 'Amazon ECR', detail: 'immutable image tags', x: 58, y: 268, tone: 'teal' },
    { id: 'cdk-diff', label: 'CDK Diff', detail: 'review changes', x: 326, y: 104, tone: 'amber' },
    { id: 'cdk-deploy', label: 'CDK Deploy', detail: 'CloudFormation update', x: 326, y: 198, tone: 'blue' },
    { id: 'ecs-stacks', label: 'Per-service\nECS Stacks', x: 604, y: 80, tone: 'blue' },
    { id: 'scheduler', label: 'EventBridge\nScheduler', x: 604, y: 170, tone: 'amber' },
    { id: 'docdb-stack', label: 'DocumentDB\nStack', x: 604, y: 260, tone: 'teal' },
    { id: 'alb', label: 'ALB Routing', detail: 'admin / customer / store / openapi', x: 774, y: 72, width: 118, height: 70, tone: 'slate' },
    { id: 'data', label: 'Data Layer', detail: 'MariaDB / DocumentDB / Valkey / S3', x: 774, y: 180, width: 118, height: 70, tone: 'teal' },
    { id: 'observability', label: 'Datadog', detail: 'APM / structured logs', x: 774, y: 288, width: 118, tone: 'blue' },
  ],
  edges: [
    { from: 'backend-repo', to: 'actions', label: 'build' },
    { from: 'actions', to: 'ecr', label: 'push' },
    { from: 'actions', to: 'cdk-diff', label: 'dispatch' },
    { from: 'cdk-diff', to: 'cdk-deploy', label: 'review' },
    { from: 'cdk-deploy', to: 'ecs-stacks' },
    { from: 'cdk-deploy', to: 'scheduler' },
    { from: 'cdk-deploy', to: 'docdb-stack' },
    { from: 'ecr', to: 'ecs-stacks' },
    { from: 'ecs-stacks', to: 'alb' },
    { from: 'ecs-stacks', to: 'data' },
    { from: 'ecs-stacks', to: 'observability' },
    { from: 'scheduler', to: 'alb' },
  ],
}

const kokkokSchema: SchemaGroup[] = [
  {
    domain: 'Account & Bank Linkage',
    description: 'KOKKOK 계정과 결제 플랫폼 고객 상태를 분리해 관리하고, 가입 이후 e-KYC와 계좌 개설 흐름을 연결합니다.',
    entities: [
      { name: 'User', fields: ['id', 'phone', 'status', 'createdAt'] },
      { name: 'PaymentPlatformLinkage', fields: ['userId', 'paymentCustomerRef', 'linkageStatus'] },
      { name: 'WalletLinkage', fields: ['userId', 'walletRef', 'walletType', 'limitStatus'] },
      { name: 'KycRequest', fields: ['userId', 'requestStatus', 'reviewedAt'] },
    ],
    relationships: [
      'User 1:N KycRequest',
      'User 1:1 PaymentPlatformLinkage',
      'PaymentPlatformLinkage 1:N WalletLinkage',
    ],
  },
  {
    domain: 'Order / Reservation / Queue',
    description: '주문, 예약, 현장대기를 분리해 POS callback과 앱 상태 전이를 명확하게 추적합니다.',
    entities: [
      { name: 'Store', fields: ['id', 'posStoreRef', 'operationStatus'] },
      { name: 'Order', fields: ['id', 'storeId', 'userId', 'orderStatus'] },
      { name: 'Reservation', fields: ['id', 'storeId', 'visitAt', 'reservationStatus'] },
      { name: 'QueueTicket', fields: ['id', 'storeId', 'sequenceNo', 'queueStatus'] },
    ],
    relationships: [
      'Store 1:N Order',
      'Store 1:N Reservation',
      'Store 1:N QueueTicket',
    ],
  },
  {
    domain: 'Payment / Reward',
    description: '외부 결제 결과와 내부 주문 상태를 느슨하게 연결하고, 금전성 이력은 별도 히스토리로 남깁니다.',
    entities: [
      { name: 'Payment', fields: ['id', 'orderId', 'provider', 'paymentStatus'] },
      { name: 'PaymentHistory', fields: ['paymentId', 'eventType', 'rawStatus'] },
      { name: 'PointLedger', fields: ['userId', 'reason', 'amount', 'balanceAfter'] },
      { name: 'GiftVoucher', fields: ['code', 'ownerId', 'useStatus'] },
    ],
    relationships: [
      'Order 1:N Payment',
      'Payment 1:N PaymentHistory',
      'User 1:N PointLedger',
    ],
  },
]

const paymentFlow: FlowDiagram = {
  title: '결제 플랫폼 가입·월렛·계좌·결제 플로우',
  description:
    '기존 결제 플랫폼 고객과 신규 고객의 상태를 분기하고, 한도가 제한된 월렛에서 e-KYC 기반 계좌 개설까지 이어지는 lifecycle을 백엔드에서 조율합니다.',
  steps: [
    { actor: 'User', title: 'KOKKOK 가입', detail: '앱 가입 요청과 휴대폰 기반 식별자를 백엔드로 전달합니다.' },
    { actor: 'Backend', title: '결제 플랫폼 고객 조회/가입', detail: '기존 고객 여부에 따라 linkage 또는 신규 고객 생성 플로우로 분기합니다.' },
    { actor: '라오스 결제 플랫폼', title: '월렛/계좌 상태 반환', detail: '계좌, 월렛, 제한 상태를 표준화한 내부 상태로 저장합니다.' },
    { actor: 'Backend', title: 'e-KYC 후속 처리', detail: '신규 고객은 한도가 제한된 월렛에서 계좌 개설 요청으로 이어지도록 상태 전이를 관리합니다.' },
    { actor: 'App', title: '결제 사용', detail: 'QR 조회, 충전, in-app 결제 결과를 앱과 내부 주문 상태에 반영합니다.' },
  ],
}

const posFlow: FlowDiagram = {
  title: 'POS 시스템 협력사 연동 플로우',
  description:
    '매장 POS에서 발생한 주문, e-Gift 사용, 예약 처리 이벤트를 KOKKOK 서버 상태와 맞추기 위해 테스트 가능한 계약으로 정리했습니다.',
  steps: [
    { actor: 'Store POS', title: '매장 액션 발생', detail: '주문 결제, e-Gift 사용, 예약 처리 이벤트가 POS에서 발생합니다.' },
    { actor: 'POS 시스템 협력사', title: 'Callback 전송', detail: 'POS 이벤트를 KOKKOK open API 또는 앱 API로 전달합니다.' },
    { actor: 'Backend', title: '상태 검증', detail: '식별자, 멱등성, 현재 상태를 검증하고 내부 주문/예약 상태를 갱신합니다.' },
    { actor: 'Partner QA', title: 'Postman 테스트', detail: '공유한 Collection과 시퀀스 문서로 양사 테스트 케이스를 맞춥니다.' },
  ],
}

const moveRealtimeFlow: FlowDiagram = {
  title: '실시간 운송 상태 흐름',
  description:
    '고객 요청, 기사 수락, 운행 상태, 결제, 알림을 API와 Socket.IO 이벤트로 연결해 라이드 헤일링 운영 흐름을 구성했습니다.',
  steps: [
    { actor: 'Customer', title: '운송 요청', detail: '출발지, 목적지, 차량 타입, 예상 가격을 기준으로 요청을 생성합니다.' },
    { actor: 'Backend', title: '기사 후보 전파', detail: '조건에 맞는 기사 앱으로 실시간 이벤트를 발행합니다.' },
    { actor: 'Driver', title: '수락/거절', detail: '기사 응답에 따라 배차 상태와 고객 앱 상태를 갱신합니다.' },
    { actor: 'Trip', title: '탑승/완료/취소', detail: '운행 상태 전이와 예외 케이스를 API와 socket 이벤트로 동기화합니다.' },
    { actor: 'Payment', title: '결제/정산', detail: 'QR 결제, 송금, 정산 배치, ERP 재처리 흐름과 연결합니다.' },
  ],
}

const moveTimeline: TimelineItem[] = [
  {
    period: '장애 탐지',
    title: 'DB 부하와 관리자 기능 영향 확인',
    detail: '초기 DB 스펙이 낮은 상태에서 관리자 엑셀 추출 시 대량 조회와 가공 부하가 발생했습니다.',
    result: '서비스 영향 범위를 관리자 기능과 데이터 조회 패턴으로 좁혔습니다.',
  },
  {
    period: '분석',
    title: 'Slow query log와 EXPLAIN 기반 병목 분석',
    detail: '느린 쿼리를 기록하고 실행 계획을 확인해 인덱스와 조회 조건 문제를 검토했습니다.',
    result: '스키마와 쿼리 튜닝이 필요한 지점을 식별했습니다.',
  },
  {
    period: '개선',
    title: '서버 역할 분리와 read replica 구성',
    detail: 'client/admin 사용자 타입별 서버 경계를 정리하고, 읽기 복제본으로 조회 부하 분산 기반을 마련했습니다.',
    result: '관리자 작업이 다른 사용자 흐름에 주는 영향을 줄이는 운영 구조로 전환했습니다.',
  },
  {
    period: '후속',
    title: 'CPU/메모리 집약 작업 분리',
    detail: '엑셀 데이터 추출은 Node.js API 서버에서 분리해 별도 처리 서버로 옮기는 방향을 추진했습니다.',
    result: '백엔드 API와 운영성 배치 작업의 책임 경계를 명확히 했습니다.',
  },
]

export const projects: Project[] = [
  {
    id: 'kokkok',
    name: 'KOKKOK',
    period: '2025.04 - 현재',
    role: '백엔드 리드 / 초기 구조 설계 / 외부 연동 / AWS CDK 전환',
    serviceUrl: 'https://laosmartmobility.com/service/kokkok',
    summary:
      '라오스 사용자를 대상으로 결제, 충전, 주문, 예약, 포인트, e-Gift, 이벤트를 하나의 계정으로 제공하는 슈퍼앱입니다. 백엔드 초기 구조, ERD 기반 데이터 모델링, 공통 라이브러리, 외부 결제·POS 연동, 배포 구조 정비를 담당했습니다.',
    brief: {
      problem:
        '슈퍼앱 초기 백엔드 구조, 결제 플랫폼 가입/월렛/계좌 상태, POS callback, 배포 구조를 동시에 정리해야 했습니다.',
      action:
        'NestJS 모노레포, ERD, 공통 라이브러리, 트랜잭션 경계, 결제/POS 상태 전이, CDK 배포 구조를 설계하고 PR 리뷰와 협력사 테스트 기준을 조율했습니다.',
      result:
        '앱별 API 경계, 공통 인프라 재사용, 외부 연동 테스트 체계, 코드 리뷰 가능한 배포 흐름과 관측성 기반을 마련했습니다.',
    },
    metrics: [
      { label: 'Service Scope', value: '슈퍼앱', caption: '결제·주문·예약·포인트 통합', tone: 'blue' },
      { label: 'Managed Runtime', value: 'ECS', caption: '앱별 서비스와 배포 경계 정리', tone: 'teal' },
      { label: 'IaC', value: 'CDK v2', caption: '배포 이력과 소유 경계 코드화', tone: 'amber' },
    ],
    contributionHighlights: [
      {
        title: '백엔드 리드 역할 구체화',
        detail: 'API 설계 방향 조율, Backend PR 리뷰 총괄, 공통 라이브러리 구조 설계, 배포/관측성 개선을 주도했습니다.',
        tone: 'blue',
      },
      {
        title: '외부 연동 테스트 기준 정리',
        detail: '결제 플랫폼과 POS 시스템 협력사에 시퀀스 다이어그램과 Postman Collection을 공유해 같은 기준으로 연동을 검증했습니다.',
        tone: 'teal',
      },
      {
        title: '운영 가능한 배포 경계 마련',
        detail: 'ECS 서비스, 스케줄러, DocumentDB, GitHub Actions OIDC 흐름을 CDK 기반으로 정리해 변경 이력을 코드 리뷰 안에서 확인할 수 있게 했습니다.',
        tone: 'amber',
      },
    ],
    responsibilities: [
      'NestJS 모노레포 초기 구조와 공통 라이브러리 기반 구축',
      'ERD 기반 데이터베이스 설계와 요청 단위 트랜잭션 경계 정리',
      'Backend PR 리뷰 총괄 및 API 설계 방향 조율',
      '라오스 결제 플랫폼의 결제, 월렛, 계좌, e-KYC 연동 프로세스 설계/개발',
      'POS 시스템 협력사의 주문, 재고, e-Gift, 예약 callback 연동과 협력사 테스트 조율',
      'AWS CDK 기반 ECS, Scheduler, DocumentDB, GitHub Actions OIDC 배포 구조 정비',
      'Datadog APM과 JSON 구조화 로그 기반의 운영 가시성 확보',
    ],
    techDecisions: [
      {
        name: 'NestJS Monorepo',
        reason: '앱별 API 서버와 공통 도메인/인프라 라이브러리를 분리해 초기 개발 속도와 재사용성을 함께 확보했습니다.',
      },
      {
        name: 'AWS CDK',
        reason: '콘솔 변경에 흩어질 수 있는 ECS, 스케줄러, 권한, 배포 이력을 코드 리뷰 가능한 형태로 관리했습니다.',
      },
      {
        name: 'Datadog',
        reason: 'APM과 JSON 구조화 로그를 연결해 trace-log correlation 기반의 장애 분석 흐름을 만들었습니다.',
      },
      {
        name: 'Redis / Valkey',
        reason: '캐시, 락, 연결 재시도와 장애 추적성을 운영 관점에서 관리하기 위해 사용했습니다.',
      },
    ],
    techStack: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'MariaDB',
      'TypeORM',
      'DocumentDB',
      'Redis / Valkey',
      'AWS ECS',
      'AWS CDK',
      'Docker',
      'GitHub Actions',
      'Datadog',
    ],
    architectureDiagrams: [kokkokAppArchitecture, kokkokAwsArchitecture],
    schemaGroups: kokkokSchema,
    flows: [paymentFlow, posFlow],
    caseStudies: [
      {
        title: '라오스 결제 플랫폼 결제·계좌 연동',
        problem: '기존 결제 플랫폼 고객과 신규 고객의 월렛, 계좌, e-KYC 상태가 달라 동일한 가입 플로우로 처리하기 어려웠습니다.',
        approach: '가입 시 결제 플랫폼 고객 상태를 조회하고 linkage 상태를 내부 모델로 정규화했으며, 제한 월렛과 계좌 개설 플로우를 분리했습니다.',
        result: '결제 API 유지보수성을 높이고, 외부 오류 포맷 차이를 구조화 로그와 공통 서비스 계층에서 다룰 수 있는 기반을 마련했습니다.',
      },
      {
        title: 'Store 현장대기 동시성 제어',
        problem: '동일 매장에 대기 등록이 동시에 몰릴 때 중복 등록이나 순번 불일치 가능성이 있었습니다.',
        approach: 'MariaDB GET_LOCK과 비관적 락을 조합하고, 자동 취소 스케줄러로 상태 정리 흐름을 추가했습니다.',
        result: '대기 순번과 상태 전이의 일관성을 높이고 운영자가 수동으로 정리해야 하는 케이스를 줄일 수 있는 기반을 만들었습니다.',
      },
      {
        title: 'CDK 기반 배포 경계 정리',
        problem: '앱별 ECS 서비스와 스케줄러가 늘어나면서 콘솔 기반 변경은 이력과 책임 경계가 흐려질 수 있었습니다.',
        approach: '변경 빈도가 높은 런타임 리소스는 CDK-managed 영역으로 옮기고, 기존 공유 리소스는 reference-only로 남겼습니다.',
        result: 'GitHub Actions, CDK diff, CDK deploy 흐름으로 배포 절차를 표준화하고 환경별 차이를 코드 리뷰 안에서 확인할 수 있게 했습니다.',
      },
    ],
  },
  {
    id: 'move',
    name: 'KOKKOK Move',
    period: '초기 개발 2023.07 - 2023.10 / 운영·개선 2023.11 - 현재',
    role: '백엔드/인프라 리드 / 실시간 운송·결제·정산 운영',
    serviceUrl: 'https://laosmartmobility.com/service/move',
    summary:
      'KOKKOK Express에서 검증한 운송/배송/결제 도메인을 사람 이동 중심 라이드 헤일링 서비스로 전환한 플랫폼입니다. 고객 앱, 기사 앱, 관리자 웹, socket 서버, scheduler 서버의 백엔드 구조와 운영 개선을 담당했습니다.',
    brief: {
      problem:
        '실시간 운송 상태와 결제/정산 흐름을 안정적으로 운영하면서 관리자 대량 조회 부하를 사용자 요청 흐름과 분리해야 했습니다.',
      action:
        'Socket.IO, scheduler, 결제/정산/ERP 재처리 흐름을 운영하고 slow query log와 EXPLAIN으로 병목을 분석해 서버 역할 분리와 read replica 구성을 추진했습니다.',
      result:
        '70만 다운로드, 45만 가입자 규모 서비스에서 사용자 요청 흐름과 관리자 운영 작업의 영향 범위를 분리하는 기반을 마련했습니다.',
    },
    metrics: [
      { label: 'Downloads', value: '70만+', caption: '2025년 말 기준 누적 다운로드', tone: 'blue' },
      { label: 'Users', value: '45만+', caption: '2025년 말 기준 가입자', tone: 'teal' },
      { label: 'Requests', value: '일일 약 1만', caption: '운행 요청, 약 3천 건 운행', tone: 'amber' },
      { label: 'Launch', value: '2023 Q4', caption: '라오스 현지 서비스 출시', tone: 'slate' },
    ],
    contributionHighlights: [
      {
        title: '실시간 운송 상태 운영',
        detail: '운송 요청, 기사 수락, 탑승, 완료, 취소, 결제 상태를 API와 Socket.IO 이벤트 흐름으로 연결했습니다.',
        tone: 'blue',
      },
      {
        title: 'DB 부하 원인 분석',
        detail: '관리자 엑셀 추출 부하를 slow query log와 EXPLAIN으로 추적하고 쿼리/스키마 튜닝, 서버 역할 분리를 추진했습니다.',
        tone: 'teal',
      },
      {
        title: '운영성 배치와 재처리',
        detail: '정산, 리워드, 기사 랭킹, ERP 실패 재처리, 운송 만료 처리를 스케줄러 서버의 운영 작업으로 관리했습니다.',
        tone: 'amber',
      },
    ],
    responsibilities: [
      'NestJS 기반 모노레포와 앱별 API, scheduler, socket 서버 구조 설계',
      '운송 요청, 배차, 탑승, 완료, 취소, 결제 상태 전이 API 개발 및 개선',
      'Socket.IO 기반 실시간 기사 위치, 운송 요청, 채팅, 상태 이벤트 연동',
      '현지 QR 결제, 송금 API, KOLAO ERP, Firebase FCM, AWS S3/SNS 연동',
      '스케줄러 서버 라이브러리 및 구조 개선, 정산/리워드/ERP 재처리 배치 관리',
      'GitHub Actions, Docker, AWS ECR/ECS 기반 배포 흐름 개선',
      'Redis 연결 재시도, keep-alive, 장애 알림 메일을 통한 추적성 개선',
    ],
    techDecisions: [
      {
        name: 'Socket.IO',
        reason: '고객 앱, 기사 앱, 관리자 웹에 운송 상태와 위치 이벤트를 실시간으로 동기화하기 위해 사용했습니다.',
      },
      {
        name: 'Scheduler Server',
        reason: '정산, 리워드, ERP 재처리, 운송 만료처럼 반복되는 운영 작업을 API 요청 흐름과 분리했습니다.',
      },
      {
        name: 'MariaDB Replica',
        reason: '관리자 대량 조회가 사용자 요청에 주는 영향을 줄이기 위해 읽기 부하 분산 기반을 마련했습니다.',
      },
      {
        name: 'Redis',
        reason: '실시간 서비스 운영 중 연결 재시도, keep-alive, 장애 알림으로 추적성과 대응성을 높였습니다.',
      },
    ],
    techStack: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'MariaDB',
      'TypeORM',
      'Socket.IO',
      'Redis',
      'AWS ECS/ECR/S3/SNS',
      'Docker',
      'GitHub Actions',
      'Firebase FCM',
    ],
    flows: [moveRealtimeFlow],
    timeline: moveTimeline,
    caseStudies: [
      {
        title: 'DB 부하 장애 분석과 운영 구조 개선',
        problem: '관리자 엑셀 추출 기능이 대량 조회와 가공을 수행하면서 DB와 Node.js 서버에 높은 부하를 만들었습니다.',
        approach: 'Slow query log와 EXPLAIN으로 병목을 분석하고, 쿼리/스키마 튜닝, 서버 역할 분리, read replica 구성을 추진했습니다.',
        result: '관리자 기능 때문에 사용자 서비스가 영향을 받는 구조를 줄이고, 읽기 부하 분산과 운영 경계 정리 기반을 마련했습니다.',
      },
      {
        title: '실시간 운송 상태 전이',
        problem: '고객 요청, 기사 수락, 운행 진행, 취소, 결제가 API와 socket 이벤트 사이에서 일관되게 맞아야 했습니다.',
        approach: '운송 상태와 결제 상태를 분리해 관리하고, socket 이벤트는 상태 변경 결과를 전파하는 흐름으로 정리했습니다.',
        result: '고객 앱, 기사 앱, 관리자 웹에서 동일한 운송 lifecycle을 기준으로 운영할 수 있는 구조를 구축했습니다.',
      },
      {
        title: '운영성 배치와 외부 API 재처리',
        problem: '정산, 기사 랭킹, 리워드, ERP 전송 실패처럼 운영 중 반복되는 후속 처리가 필요했습니다.',
        approach: '스케줄러 서버 구조를 개선하고 실패 데이터 재처리, 만료 처리, 리워드 집계 작업을 배치로 관리했습니다.',
        result: '운영자가 수동으로 확인해야 하는 반복 작업을 줄이고, 외부 API 점검이나 정책 변경 시 대응 범위를 좁혔습니다.',
      },
    ],
  },
  {
    id: 'express',
    name: 'KOKKOK Express',
    period: '2022.09 - 2022.11',
    role: '백엔드 개발 / 운송·배송·결제 도메인 기반 구축',
    summary:
      'KOKKOK Move의 전신 프로젝트입니다. 물류 배송 서비스로 시작해 사람 이동을 지원하는 모빌리티 서비스로 방향을 전환했고, 차량 호출, 배송, 기사, 결제, 정산 도메인 경험이 이후 Move 설계의 기반이 되었습니다.',
    brief: {
      problem:
        '물류 서비스에서 운송, 결제, 정산, 기사 운영 도메인을 빠르게 검증하고 이후 모빌리티 전환에 활용할 기반이 필요했습니다.',
      action:
        'Express API, MySQL/Knex transaction, 결제 callback/history, 기사 포인트 원장, 배포/헬스체크를 구축하고 개선했습니다.',
      result:
        'KOKKOK Move로 이어지는 운송 상태 전이와 금전성 데이터 처리 경험을 확보했습니다.',
    },
    metrics: [
      { label: 'Domain', value: 'Mobility', caption: '배송에서 라이드 헤일링으로 확장', tone: 'blue' },
      { label: 'Backend', value: 'Express', caption: 'Node.js API 서버 운영', tone: 'slate' },
      { label: 'Payment', value: 'QR', caption: '결제 callback과 이력 관리', tone: 'teal' },
    ],
    contributionHighlights: [
      {
        title: '운송/배송 API 기반 구축',
        detail: '고객 앱, 기사 앱, 관리자 웹에서 사용하는 차량 호출, 배송, 기사, 결제, 정산 API를 설계하고 구현했습니다.',
        tone: 'blue',
      },
      {
        title: '금전성 이력 추적',
        detail: '결제 callback 중복/실패 상황에 대비해 payment history와 기사 포인트 원장 처리 흐름을 정리했습니다.',
        tone: 'teal',
      },
      {
        title: '운영 배포 기본기 정리',
        detail: 'PM2, Docker, ECR, healthcheck, non-root 실행, 배포 문서화를 통해 운영 가능한 배포 절차를 마련했습니다.',
        tone: 'slate',
      },
    ],
    responsibilities: [
      'Node.js Express 기반 고객 앱, 기사 앱, 관리자 웹 API 설계/구현',
      'MySQL/Knex transaction 기반 운송 상태, 결제 상태, 기사 포인트 원장 처리',
      '차량 타입, 거리, 시간, 보험료, 할증/할인 정책을 반영한 견적 검증 로직 개선',
      '자체 결제와 현지 QR 결제 callback, 실패/중복 상황 대응',
      'SMS OTP HMAC signature, timestamp TTL, rate limit 검증 적용',
      'Firebase FCM, AWS S3/SNS, Redis, MongoDB, ERP API, SMTP 연동 운영',
      'PM2, Docker, ECR 배포 구성과 healthcheck, non-root 실행, 배포 문서화',
    ],
    techDecisions: [
      {
        name: 'Express',
        reason: '초기 서비스 요구사항을 빠르게 API로 구현하고 고객/기사/관리자 기능을 분리하기 위해 사용했습니다.',
      },
      {
        name: 'Knex Transaction',
        reason: '운송 상태, 결제 상태, 기사 포인트 원장처럼 함께 처리되어야 하는 금전성 변경을 명시적으로 관리했습니다.',
      },
      {
        name: 'Redis / MongoDB',
        reason: '캐시와 일부 운영성 데이터를 관계형 데이터와 분리해 다루기 위해 사용했습니다.',
      },
      {
        name: 'PM2 / Docker / ECR',
        reason: 'Node.js API 서버의 실행 설정과 이미지 배포 절차를 운영 문서와 함께 정리했습니다.',
      },
    ],
    techStack: [
      'Node.js',
      'Express',
      'MySQL',
      'Knex',
      'Redis',
      'MongoDB',
      'AWS S3/SNS/ECR',
      'Docker',
      'PM2',
      'Firebase FCM',
    ],
    caseStudies: [
      {
        title: 'Move로 이어진 도메인 기반',
        problem: '초기 물류 서비스에서 운송, 결제, 정산, 기사 운영 도메인을 빠르게 검증해야 했습니다.',
        approach: '고객/기사/관리자 API를 나누고, 상태 전이와 금전성 이력을 transaction 단위로 관리했습니다.',
        result: '배송 중심 서비스에서 사람 이동 중심 라이드 헤일링으로 전환할 수 있는 백엔드 도메인 경험을 확보했습니다.',
      },
      {
        title: '금전성 데이터 처리',
        problem: '결제 callback 중복, 실패, 정산 데이터 불일치 가능성에 대비해야 했습니다.',
        approach: 'payment history와 운영 알림을 남기고, 기사 포인트 원장과 정산 로직의 권한 검증을 개선했습니다.',
        result: '운영자가 결제/정산 이슈를 추적하고 보완할 수 있는 기록 기반을 만들었습니다.',
      },
    ],
  },
]
