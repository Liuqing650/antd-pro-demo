---
title:
  en-US: ModalComponent
  zh-CN: ModalComponent
subtitle: 模态窗
cols: 1
order: 8
---

一个模态窗工具，写入组件内容。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
title | 模态窗名字 | string | -
width | 模态框宽度 | number | -
modalType | 当前编辑状态 | string[] | -
visible | 模态窗开关 | boolean | -
ModalComponent | 模态窗内容组件 | object or Node | -
handleOk | 数据提交 | function(value) | -
handleCancel | 关闭模态窗 | function(value) | -
