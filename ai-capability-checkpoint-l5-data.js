(function(){
const C=(id,title,duration,explanation,objectives,misconceptions,noCodeLab,codeLab,deliverable,rubric,quiz,resources,expertComment,pitfalls)=>({id,title,duration,explanation,objectives,misconceptions,noCodeLab,codeLab,deliverable,rubric,quiz,resources,expertComment,pitfalls});
const Q=(q,options,answer,why)=>({q,options,answer,why});
const S={
  openrouterQuick:['OpenRouter Quickstart','https://openrouter.ai/docs/quickstart','理解统一 API、模型切换和基本调用方式'],
  openrouterRouting:['OpenRouter Provider Routing','https://openrouter.ai/docs/guides/routing/provider-selection','查看提供商排序、回退、隐私和参数支持设置'],
  openrouterPrivacy:['OpenRouter Data Privacy','https://openrouter.ai/docs/guides/privacy/data-collection','核对平台与下游提供商的数据处理边界'],
  githubRepo:['GitHub · Repositories','https://docs.github.com/en/repositories/creating-and-managing-repositories','认识仓库、分支、提交和项目文件'],
  githubIssues:['GitHub · Issues','https://docs.github.com/en/issues/tracking-your-work-with-issues','理解 Issue 如何反映问题、需求和维护协作'],
  githubReleases:['GitHub · Releases','https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases','用 Release 和 Tag 识别可复现版本'],
  hfHub:['Hugging Face Hub','https://huggingface.co/docs/hub/en/index','理解 Models、Datasets 与 Spaces 的不同职责'],
  hfCards:['Hugging Face Model Cards','https://huggingface.co/docs/hub/model-cards','阅读用途、限制、数据、评测和许可证信息'],
  hfSecurity:['Hugging Face · Pickle Scanning','https://huggingface.co/docs/hub/security-pickle','了解不可信模型文件的代码执行风险与安全格式'],
  superclue:['SuperCLUE','https://www.superclueai.com/homepage','参考中文大模型评测维度与结果'],
  opencompass:['OpenCompass','https://opencompass.org.cn/home','查看开放评测体系、数据集与模型结果'],
  livebench:['LiveBench','https://livebench.ai/#/?sort=cpst&dir=asc','观察持续更新的模型能力对比'],
  aa:['Artificial Analysis · Models','https://artificialanalysis.ai/models','比较模型质量、速度、价格等公开指标']
};

const aiSites=[
C('0-0','AI 网站能力地图与来源判断','45–60 分钟',
['AI 网站并不是同一种信息源。模型厂商官网负责发布能力和版本，OpenRouter 一类聚合平台负责模型发现与调用，GitHub 负责代码协作，Hugging Face 承载模型、数据集和 Demo，评测站提供特定方法下的对比结果。先判断网站角色，才能知道它能证明什么。','本路径用“中文客服对话摘要”作为连续案例。你将先建立来源地图，再分别用 OpenRouter、GitHub 和 Hugging Face 收集证据，最后形成可复核的选型资料，而不是根据一个榜单或热门数字直接拍板。'],
['能区分发布、调用、代码协作、资产托管、Demo 与独立评测平台','能为一个产品问题选择合适的网站入口和一手证据','能判断热度、下载量、榜单分数与业务适配之间的证据差距'],
['网站排名靠前，信息就一定更权威。','Star、下载量或调用量高，代表模型一定适合自己的场景。','多个网站显示相同结论，就必然构成独立交叉验证。'],
['写下“为中文客服对话生成事实准确、可追溯摘要”的目标、不可接受错误和三个待验证问题。','建立六列表：网站、平台角色、可回答问题、不能证明什么、版本日期、下一步核验来源。','把厂商官网、OpenRouter、GitHub、Hugging Face、SuperCLUE、OpenCompass、LiveBench 和 Artificial Analysis 放入表中。','任选一个模型，在至少三个不同角色的网站中找到相关页面，记录它们是否引用了同一上游信息。','写出一条暂定结论，并标注事实、推断和仍缺少的业务证据。'],
{intro:'用最小对象记录“主张—来源—证据类型—版本”，目的是避免收藏链接后无法追溯结论。',code:`const evidence = {
  claim: "候选模型适合中文客服摘要",
  sourceRole: "benchmark | vendor | repository | hub | router",
  url: "https://example.com/source",
  observedAt: "2026-08-19",
  modelVersion: "exact-model-id",
  supports: "它实际支持的有限结论",
  doesNotProve: "尚未用真实客服样本验证"
};

console.table([evidence]);`},
{title:'AI 网站来源地图包',items:['一张至少覆盖 8 个网站的平台角色与证据边界表','一个候选模型的三站证据链和版本记录','一条区分事实、推断与缺口的暂定选型结论']},
['每个网站都写清“能证明”和“不能证明”的内容','关键结论可以回到具体页面、模型版本和访问日期','没有用热度或单一榜单代替真实任务评测'],
[Q('要确认一个开源项目最近修复了哪些问题，优先查看哪里？',['GitHub Release、提交与关联 Issue','模型调用聚合页的价格','任意转载文章'],0,'版本变化应回到项目仓库的 Release、提交和问题记录。'),Q('多个榜单都显示某模型领先，最合理的下一步是什么？',['直接全量上线','用同一模型名搜索更多宣传稿','核对版本与评测方法，再用真实任务样本测试'],2,'公开榜单是候选发现证据，不能替代业务样本与上线约束。'),Q('Star 数量最能说明什么？',['社区关注信号，而非质量、许可证或生产适配保证','项目没有安全风险','项目维护者提供商业 SLA'],0,'热度是线索，不是产品采用结论。')],
[S.hfHub,S.githubRepo,S.opencompass],
'平台角色不等于证据权威：聚合页适合发现，仓库适合追版本，模型卡适合读声明，评测站适合看特定方法下的结果；真正的产品结论仍要落回准确版本和自己的任务样本。',
['技术与系统：同一模型名称可能对应不同快照、量化或提供商，混用结果会让对比无法复现。','产品与用户：榜单任务与真实客服中的口语、脏数据和高代价错误不一致，公开高分可能无法改善用户结果。','组织与商业：团队只收藏链接却不记录负责人和复查日期，结论过期后仍可能进入采购或路线图。']),

C('0-1','账号、数据、许可证与安全边界','45–60 分钟',
['“网页可以打开”只代表可以访问，不代表内容可以商用、文件可以安全执行、数据可以随意上传。使用 AI 平台前要同时检查账号权限、API 密钥、输入数据、平台保留政策、下游提供商政策、许可证和第三方依赖。','网站教学最容易遗漏的是责任链：谁批准上传数据，谁保管密钥，谁确认许可证，谁处理删除请求，发生泄露或供应商变化时谁负责。把这些问题前置，才能避免 Demo 成功后才发现无法上线。'],
['能建立网站使用前的数据、权限、许可证和密钥检查清单','能区分公开可下载、允许研究和允许商业使用','能识别第三方模型文件、在线 Demo 与路由服务中的责任边界'],
['公开仓库或模型可以直接用于任何商业产品。','不把姓名写进提示词，就一定完成了隐私保护。','平台声明不训练数据，意味着所有下游提供商也采用同一政策。'],
['为客服摘要案例建立数据分级：公开、内部、客户敏感、禁止外发，并给出各级允许使用的平台。','分别查看 OpenRouter 数据说明、一个候选模型的许可证和仓库安全说明，记录平台、提供商、资产作者三方责任。','设计 API Key 生命周期：申请人、用途、最小权限、额度、存放位置、轮换与撤销。','选一个 Hugging Face 模型文件，确认格式、来源、提交者和安全扫描提示；不要下载或执行不可信文件。','完成一次“能否进入 PoC”的门禁判断，并写出缺资料时的默认动作。'],
{intro:'以下配置只是审查模板，不包含真实密钥。它把数据等级、平台批准和许可证决策放进同一门禁。',code:`const adoptionGate = {
  dataClass: "synthetic-only",
  approvedPlatforms: ["approved-router", "approved-hub"],
  apiKey: { owner: "product-lab", maxMonthlyUsd: 20, storedIn: "secret-manager" },
  license: { id: "verify-exact-license", commercialUse: "unknown" },
  artifact: { format: "prefer-safe-format", trustedPublisher: false }
};

const canPilot = adoptionGate.license.commercialUse === true
  && adoptionGate.artifact.trustedPublisher;
console.log({ canPilot });`},
{title:'平台使用安全门禁包',items:['一份数据分级、平台审批和输入边界表','一份密钥生命周期与费用额度清单','一份候选资产的许可证、文件格式和责任链审查记录']},
['缺少许可证或数据政策时结论为待确认，而不是默认允许','真实客户数据不会进入未批准平台，示例不包含真实密钥','明确平台、下游提供商、资产作者和使用组织各自责任'],
[Q('模型仓库公开可下载，商业产品采用前仍需确认什么？',['许可证、依赖、数据限制与准确版本','只有下载量','页面配色'],0,'可访问不等于拥有商业使用和再分发权利。'),Q('路由平台自身不训练提示数据，是否足够？',['足够，所有提供商政策必然相同','还要核对具体下游提供商、路由设置和组织数据政策','只需换一个项目名'],1,'请求可能由下游提供商处理，必须逐层检查。'),Q('处理不可信模型文件的稳妥方式是什么？',['直接在生产机器执行','优先可信来源和安全格式，并在隔离环境检查','关闭安全扫描提示'],1,'某些序列化格式可能带来代码执行风险，来源与隔离都很重要。')],
[S.openrouterPrivacy,S.hfCards,S.hfSecurity],
'“开源、免费、公开”分别描述获取方式、价格或代码可见性，不自动回答商用授权、数据责任和运行安全；产品经理必须把许可与责任变成上线门禁。',
['技术与系统：把 API Key 写入前端或示例仓库会造成盗用、超额费用和数据暴露，应使用服务端密钥管理与最小额度。','产品与用户：在线 Demo 常缺少企业权限、删除和审计能力，体验可用不等于产品可用。','组织与商业：许可证、数据条款或供应商政策变化可能迫使下线，合同和路线图必须保留替代与退出方案。']),

C('1-0','OpenRouter：模型发现、对比与统一 API','50–70 分钟',
['OpenRouter 是模型调用聚合与路由服务：它用较统一的接口连接多个模型和提供商，便于发现模型、比较公开价格与上下文信息，并设置提供商路由或回退。它不是独立的模型实验室，也不保证同名模型在所有提供商上的延迟、参数支持和数据政策完全一致。','产品选型时应把“单次 Token 单价”升级为“每个成功任务的全成本”。除了输入输出费用，还要记录失败重试、延迟、人工核验、提供商差异和业务成功率。便宜但经常返工的配置，可能比高单价模型更贵。'],
['能用 OpenRouter 查找候选模型并读懂价格、上下文和提供商信息','能解释统一 API、提供商路由、回退与隐私设置的作用','能按成功任务计算质量、延迟、调用费和人工复核的综合成本'],
['OpenRouter 自己训练并拥有页面上的全部模型。','使用同一个模型 ID，就不需要关注实际提供商。','Token 单价最低的模型必然拥有最低业务成本。'],
['在 OpenRouter 选择 2–3 个支持客服摘要的候选模型，记录准确模型 ID、价格、上下文和可用提供商。','用同一段虚构客服对话在聊天界面测试候选模型，固定输出要求，记录事实错误、遗漏、延迟体感和输出长度。','查看提供商路由设置，记录参数支持、数据收集、零数据保留或回退条件；不输入真实客户数据。','按“调用费 + 失败重试 + 人工核验分钟数”估算每 1000 个成功摘要的成本。','写出首选、回退与停止使用条件，不把一次输出当成结论。'],
{intro:'这是与 OpenAI 风格兼容的请求结构示意，只打印配置，不包含密钥或真实调用。重点是显式记录模型、路由和数据偏好。',code:`const request = {
  model: "provider/exact-model-id",
  messages: [{ role: "user", content: "请摘要这段虚构客服对话……" }],
  temperature: 0,
  provider: {
    allow_fallbacks: true,
    require_parameters: true,
    data_collection: "deny"
  }
};

console.log(JSON.stringify(request, null, 2));`},
{title:'OpenRouter 候选模型实验包',items:['一张 2–3 个模型与提供商的版本、价格、隐私和参数对照表','至少 10 条虚构样本的质量、延迟、失败与人工核验记录','首选、回退、预算上限和停用条件']},
['所有对比使用相同样本、任务定义和通过标准','成本按成功任务计算并包含重试与人工核验','记录具体模型和提供商，不把路由平台当作独立评测结论'],
[Q('OpenRouter 的核心角色更接近什么？',['统一访问多模型和提供商的聚合路由层','独立训练所有模型的实验室','只发布学术论文的数据库'],0,'它主要提供统一访问和路由，不拥有或训练全部模型。'),Q('为什么同一模型仍要记录提供商？',['提供商可能影响可用区域、延迟、参数支持和数据政策','因为模型权重一定不同','只是为了页面美观'],0,'生产差异常出现在服务层，而不只在模型名。'),Q('低价模型如何判断是否真省钱？',['只比较每百万 Token 单价','比较每个成功任务的调用、重试、核验和失败成本','选择上下文最长者'],1,'单位经济必须按业务成功结果计算。')],
[S.openrouterQuick,S.openrouterRouting,S.openrouterPrivacy],
'OpenRouter 降低的是多模型接入与切换摩擦，不会替你完成业务评测、数据审批和供应商治理；统一接口不等于统一质量，更不等于统一责任。',
['技术与系统：自动回退可能切换到延迟、参数或数据政策不同的提供商，关键任务应显式约束并记录实际路由。','产品与用户：聊天页的一次好结果容易造成 Demo 幻觉，必须用代表性样本和一致评分标准复测。','组织与商业：充值余额、价格变化、地区可用性和供应商中断会影响连续性，应设置预算告警、回退和退出方案。']),

C('1-1','GitHub：读懂开源项目与协作信号','50–70 分钟',
['GitHub 是版本化代码与协作平台。README 帮助快速理解项目定位和上手方式，但真正判断可采用性还要查看许可证、Release/Tag、提交活跃度、Issue、Pull Request、贡献者、依赖与安全说明。默认分支的最新代码不一定是稳定版本。','产品经理不必阅读每行代码，却要能从仓库信号判断：它解决什么问题、由谁维护、当前版本能否复现、已知问题有多严重、升级是否兼容、团队需要承担多少集成和支持成本。'],
['能从仓库首页定位 README、许可证、Release、Issue、Pull Request 和安全入口','能区分社区热度、维护健康、版本稳定与商业支持','能把开源项目风险转成 PoC 门禁、升级策略和维护预算'],
['README 写得完整，就代表生产质量可靠。','Star 多等于维护活跃、漏洞少且一定有长期支持。','复制默认分支代码比使用固定 Release 更稳定。'],
['为客服摘要案例选择一个相关开源项目，先用 README 写出项目承诺解决的问题。','检查许可证、最新 Release 日期、Tag、最近提交、开放 Issue 和合并 PR，分别记录可信信号与风险信号。','选择三个与安装、模型兼容或数据安全有关的 Issue，判断是否影响自己的使用场景。','记录可复现版本或 Commit，并写出升级前需要回归的三项能力。','估算内部维护工作：部署、依赖升级、安全修复、问题排查和社区无响应时的兜底。'],
{intro:'仓库评审记录应固定版本并保留决策依据。以下对象可以保存进产品选型文档。',code:`const repoReview = {
  repository: "owner/project",
  pinnedRef: "v1.2.3-or-commit-sha",
  license: "verify-from-repository",
  lastRelease: "YYYY-MM-DD",
  blockingIssues: ["#123"],
  regressionChecks: ["summary accuracy", "privacy", "dependency compatibility"],
  owner: "team-name",
  revisitOn: "YYYY-MM-DD"
};

console.table([repoReview]);`},
{title:'GitHub 项目采用评审包',items:['一张仓库定位、版本、许可证、维护和安全信号表','三个相关 Issue 的业务影响与处置结论','固定版本、升级回归项、内部 owner 与维护成本估算']},
['结论引用具体 Release、Commit 或 Issue，而非只引用仓库首页','能解释 Star、活跃度、稳定性和 SLA 为什么不是同一件事','采用方案包含版本固定、升级测试和项目停更后的替代路径'],
[Q('要保证 PoC 两周后可复现，最重要的动作是什么？',['记录并固定 Release、Tag 或 Commit','只收藏仓库首页','选择 Star 最大的项目'],0,'固定准确版本才能避免默认分支持续变化。'),Q('README 能提供什么？',['项目定位与基本用法，但不能独立保证稳定、安全和商用权利','完整的商业 SLA','所有未公开漏洞'],0,'README 是入口，不是完整尽调。'),Q('项目半年无 Release 且关键 Issue 无回应，产品判断应是什么？',['忽略并直接上线','评估维护负担、替代方案和停止条件','多点几次 Star'],1,'社区无响应会把维护责任转移给采用团队。')],
[S.githubRepo,S.githubIssues,S.githubReleases],
'GitHub 上最容易被误读的指标是 Star：它衡量关注，不衡量你需要的版本是否稳定、许可证是否合适，也不承诺有人在事故发生时为你提供支持。',
['技术与系统：直接跟随默认分支会引入未发布变更和依赖漂移，应固定版本并建立升级回归。','产品与用户：项目示例覆盖 happy path，但真实输入、权限和失败恢复可能缺失，需要在 PoC 中补测。','组织与商业：免费代码可能转化为内部运维、安全和支持成本；没有明确 owner 的开源依赖最终会成为无人负责的生产风险。']),

C('2-0','Hugging Face：模型、数据集与 Spaces','50–70 分钟',
['Hugging Face Hub 同时承载 Models、Datasets 和 Spaces：模型仓库保存权重与模型卡，数据集仓库提供数据及数据集卡，Space 更像可运行的展示或应用。三者可以互相关联，但用途和证据边界不同。','模型卡通常由发布者提供，应该重点阅读准确模型 ID、任务、语言、许可证、训练或微调信息、评测、限制、文件格式与版本。下载量和在线 Demo 适合发现候选，但不是独立质量保证，也不能代替生产架构评审。'],
['能区分 Model、Dataset 和 Space 并选择正确入口','能从模型卡提取用途、限制、许可证、评测和版本信息','能识别在线 Demo、下载量和发布者声明的证据边界与文件风险'],
['Space 可以运行，就代表底层模型可直接部署到生产。','Model Card 上的评测结果一定由独立第三方验证。','模型文件下载量高，许可证和安全风险就可以忽略。'],
['在 Hugging Face 查找一个支持中文摘要的模型，记录发布者、准确模型 ID、任务标签、许可证、最近更新时间和文件格式。','阅读模型卡，将“发布者声明”“可验证事实”“未披露信息”分成三栏。','找到关联数据集或评测说明，判断语言、领域、切分和许可证是否匹配客服场景。','体验一个相关 Space，只使用虚构文本，记录它额外加入的 Prompt、参数、后处理或界面限制。','对比模型卡结论与 OpenRouter/GitHub 记录，列出三个仍需自己验证的问题。'],
{intro:'用结构化清单保存 Hub 资产信息，避免只复制模型名称后丢失许可证、Revision 和限制。',code:`const hubAsset = {
  type: "model",
  id: "publisher/exact-model-id",
  revision: "commit-or-tag",
  license: "verify-on-card",
  intendedUse: ["summarization"],
  limitations: ["verify Chinese support", "verify customer-domain accuracy"],
  files: [{ name: "model.safetensors", trustedSource: false }],
  demoIsProductionEvidence: false
};

console.log(JSON.stringify(hubAsset, null, 2));`},
{title:'Hugging Face 资产审查包',items:['一张模型、数据集和 Space 的角色与证据边界表','一个候选模型的版本、许可证、评测、限制和文件审查卡','模型卡、Demo 与客服真实任务之间的待验证差距']},
['模型记录包含发布者、准确 ID、Revision 与许可证','把发布者声明与独立验证、业务验证明确分开','没有运行不可信文件，也没有把 Space 当成生产可用证明'],
[Q('Hugging Face Space 最能证明什么？',['某个演示流程在当前环境可以运行，但不保证生产 SLA','模型一定允许商业使用','底层评测必然独立'],0,'Space 是体验入口，生产能力仍需单独审查。'),Q('模型卡中的分数应该怎样使用？',['结合评测数据、方法、版本和业务样本核验','直接视为所有场景质量','只看最高一项'],0,'分数的含义依赖版本、数据和方法。'),Q('下载模型文件前首先应关注什么？',['来源、文件格式、安全提示与固定版本','页面颜色','评论数量'],0,'不可信序列化文件可能有运行风险。')],
[S.hfHub,S.hfCards,S.hfSecurity],
'Hugging Face 是 AI 资产目录、协作与分发基础设施，不是统一质量认证中心；模型卡是尽调入口，不是免责声明的替代品，更不是生产验收报告。',
['技术与系统：模型 Revision、Tokenizer、推理代码和权重格式不一致会导致复现失败，必须整体固定。','产品与用户：Space 可能包含隐藏 Prompt、人工示例和后处理，Demo 体验不能只归因于底层模型。','组织与商业：模型、数据和代码许可证可能不同，组合使用时要分别核验并记录再分发与商用条件。']),

C('2-1','跨站核验与个人 AI 信息工作流','60–75 分钟',
['高质量网站的真正价值不在于收藏数量，而在于形成稳定的信息工作流：发现候选、回到一手发布、固定版本、核对代码和资产、参考多种公开评测、用真实样本验证、形成决策并安排复查。不同网站提供不同证据，只有统一到同一个模型版本和业务问题上才可比较。','最终交付不是“哪个模型最好”，而是一个可更新的条件性结论：在什么场景、流量、风险和成本下选择谁；什么时候回退；哪些新证据会改变决策。网站、模型和条款都在变化，因此个人导航必须包含 owner、访问日期、更新频率和淘汰机制。'],
['能围绕同一候选模型建立官网、路由、仓库、Hub、评测与业务样本证据链','能输出包含质量、延迟、成本、隐私、许可证和维护性的选型建议','能建立有复查日期、变化触发器和淘汰规则的个人 AI 导航'],
['收藏的网站越多，信息工作流越成熟。','只要不同网站结论一致，就无需核对模型版本和数据来源。','选型完成后无需复评，除非产品出现严重事故。'],
['选择客服摘要案例的两个最终候选，统一准确模型版本、提供商和测试配置。','建立证据矩阵：官网发布、OpenRouter 服务信息、GitHub 版本与问题、Hugging Face 模型卡、至少两个评测站、20 条虚构或脱敏业务样本。','标出冲突证据并追查原因：版本、任务、语言、提供商、数据污染、评分方式或时间差。','形成质量—延迟—成功任务成本—隐私—许可证—维护性决策表，给出首选、回退和不采用条件。','把本次有效入口整理成个人导航，为每项增加用途、可信层级、更新频率、owner、复查日期和淘汰条件。'],
{intro:'用统一记录把跨站证据转换成可复评的产品决策。评分只是示意，权重必须来自业务风险和目标。',code:`const decision = {
  useCase: "Chinese customer-support summarization",
  evaluatedAt: "2026-08-19",
  candidates: [
    { id: "model-a@revision", quality: 4, latency: 3, costPerSuccess: 2, risk: 2 },
    { id: "model-b@revision", quality: 3, latency: 4, costPerSuccess: 4, risk: 3 }
  ],
  primary: "model-a@revision",
  fallback: "model-b@revision",
  stopIf: ["critical-fact-error-rate > threshold", "license changes"],
  reviewOn: "2026-09-19"
};

console.table(decision.candidates);`},
{title:'跨站选型与个人导航交付包',items:['一份两个候选模型的跨站证据矩阵与冲突解释','一份包含首选、回退、成本、风险、门槛和复评日期的产品决策记录','一份“网站—用途—可信层级—更新频率—淘汰条件”个人 AI 导航']},
['所有证据对齐到准确版本、时间和同一个业务问题','选型结论同时覆盖模型质量、系统服务、用户核验、组织责任和单位经济','个人导航能持续更新，有明确 owner、复查日期和淘汰规则'],
[Q('跨站结果冲突时首先应该做什么？',['核对模型版本、任务、数据、提供商、时间和评分方法','选择自己喜欢的结果','把所有分数直接求平均'],0,'不同对象与方法不能直接比较。'),Q('一份可执行的选型结论应包含什么？',['永久不变的“最佳模型”名称','适用条件、证据、风险、回退、停止条件和复评日期','最多的收藏链接'],1,'产品决策必须可行动、可退出、可更新。'),Q('个人 AI 导航如何避免变成链接坟场？',['增加更多分类颜色','为入口设置用途、可信层级、owner、复查与淘汰规则','从不删除旧链接'],1,'维护机制比收藏规模更重要。')],
[S.superclue,S.opencompass,S.livebench,S.aa],
'专家的优势不是知道更多网址，而是知道每个网址只能回答哪一层问题，并能把分散、易过期的公开信号转成带版本、门槛、回退和复评日期的产品决策。',
['技术与系统：跨站模型名、Revision 和提供商没有对齐时，综合表看似完整但比较对象其实不同。','产品与用户：过度研究公开资料会延迟真实用户验证，应给网站调研设时限并尽快进入代表性样本。','组织与商业：没有 owner 和复评预算的信息库会迅速过期；关键供应商、许可证或价格变化必须触发重新决策。'])
];

window.L5_CHECKPOINT_SETS={
  'l5-ai-sites':{layer:'L5',title:'AI 高质量网站与社区使用',version:'expert-v1',checkpoints:aiSites}
};
})();
