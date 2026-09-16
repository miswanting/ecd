// 内置流程数据，供 <FlowNav /> 使用。
//
// 每个 stage 是一“层”，mode 决定层内节点的排布：
//   sequence —— 依次执行（用 → 连接）
//   choice   —— 互斥分支（上下并列）
// 节点的 kind 决定配色：engine（引擎）/ event（事件函数）/ command（命令）。

export const eventFlow = {
  stages: [
    {
      title: "启动",
      mode: "sequence",
      nodes: [
        {
          label: "@SYSTEM_TITLE",
          kind: "event",
          desc: "标题画面。未定义时使用引擎自带标题。",
          link: "/reference/ERB_Internal_Process",
        },
      ],
    },
    {
      title: "新游戏 / 读取存档",
      mode: "choice",
      nodes: [
        {
          label: "从头开始",
          kind: "engine",
          desc: "执行 BEGIN FIRST。",
        },
        {
          label: "@EVENTFIRST",
          kind: "event",
          desc: "新游戏初始化、开场。",
          link: "/reference/ERB_Internal_Process",
        },
        {
          label: "@TITLE_LOADGAME",
          kind: "event",
          desc: "在标准标题画面选择“读取存档”时调用。",
          link: "/reference/ERB_Internal_Process",
        },
        {
          label: "@EVENTLOAD",
          kind: "event",
          desc: "存档读取完毕后调用。",
          link: "/reference/ERB_Internal_Process",
        },
      ],
    },
    {
      title: "主循环",
      mode: "sequence",
      nodes: [
        {
          label: "@SHOW_SHOP",
          kind: "event",
          desc: "进入商店 / 主界面，玩家在这里反复操作。",
          link: "/reference/ERB_Internal_Process",
        },
      ],
    },
    {
      title: "训练循环",
      mode: "sequence",
      nodes: [
        {
          label: "@EVENTTRAIN",
          kind: "event",
          desc: "开始训练时调用。",
          link: "/reference/ERB_Internal_Process",
        },
        {
          label: "@SHOW_STATUS",
          kind: "event",
          desc: "显示状态栏。",
          link: "/reference/ERB_Internal_Process",
        },
        {
          label: "@SHOW_USERCOM",
          kind: "event",
          desc: "显示可选指令菜单。",
          link: "/reference/ERB_Internal_Process",
        },
        {
          label: "@USERCOM",
          kind: "event",
          desc: "玩家选择指令后处理。",
          link: "/reference/ERB_Internal_Process",
        },
        {
          label: "@EVENTCOM",
          kind: "event",
          desc: "执行指令的具体效果。",
          link: "/reference/ERB_Internal_Process",
        },
        {
          label: "@EVENTCOMEND",
          kind: "event",
          desc: "指令结束后的收尾。",
          link: "/reference/ERB_Internal_Process",
        },
      ],
    },
    {
      title: "结束",
      mode: "sequence",
      nodes: [
        {
          label: "@EVENTEND",
          kind: "event",
          desc: "游戏结束时调用。",
          link: "/reference/ERB_Internal_Process",
        },
      ],
    },
  ],
};
