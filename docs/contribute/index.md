# 参与编写文档

## 讨论

请移步至 [Github Discussions](https://github.com/miswanting/Era-Chinese-Documentation/discussions)。

## 勘误

请移步至 [Github Issues](https://github.com/miswanting/Era-Chinese-Documentation/issues)，并发起一个 Issue。更正完毕后会关闭相关 Issue。

## 参与创作

参与创作是一个标准的 PR 流程。

### 询问我

### Fork 仓库

1. 登录 Github。
2. Fork Era-Chinese-Documentation 项目至自己的账号中。

### Clone 至本地

```
git clone https://github.com/<你的用户名>/Era-Chinese-Documentation.git
```

### 切换到活跃分支

```
git checkout dev
```

### 编写文档

文档标准请参考[这里](Documentation_Standard)。

### 确认可靠性

运行下列代码：

```
yarn docs:serve
```

能看到：

```
build complete in XX.XXs.
Done in XX.XXs.
```

且无其他 Error，即通过。

### Commit 变更

```
git add -A
git commit
```

### Push 至仓库

```
git push
```

### 提交 PR

1. 去到主项目的 PR 界面
   - 地址：https://github.com/miswanting/Era-Chinese-Documentation/pulls
2. 点击`New`
3. 做好设置，等待合并。

### 参与校对

1. 提交的内容可能会被要求修改；

### 署名

