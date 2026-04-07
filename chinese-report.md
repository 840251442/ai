# 数据平台-中国式报表


## 1 介绍
中国式报表功能是数据平台中数据展示及分析的一项非常重要的手段，出了常规的报表格式，也支持搭建更加复杂、更为个性的报表样式。相比普通的报表工具，中国式报表可以实现更多的个性化报表需求，并有着相比定制开发更为快速，简洁的优势。

## 2 功能
红圈数据平台中，可以从菜单项中直接进入中国式报表。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773771435-1d70d251-bc67-4e61-b5ce-b49dc9e26a53.png" width="1268" title="" crop="0,0,1,1" id="EU7pX" class="ne-image">

### 2.1列表项
从菜单中点击数据中国式报表，即可打开中国式报表的列表页。列表页中会显示中国式报表名称，创建人，创建时间，修改人，修改时间，并可以对有权限的报表进行预览，编辑，复制，删除，分享和发布。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773771583-707930e3-04fc-4d45-9faf-a50f2dfeb362.png" width="1268" title="" crop="0,0,1,1" id="gLgsr" class="ne-image">

### 2.2设计界面


<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773771726-fba44607-3faa-4078-befe-04af37b0a300.png" width="1266" title="" crop="0,0,1,1" id="pNtoQ" class="ne-image">

如图所示，中国式报表设计界面分为8个部分：

1. 数据模型选择区域：此处显示的是在配置报表，可以使用的数据模型；一般在配置开始阶段，通过“添加数据模型”按钮进行添加。
2. 快捷操作栏：对报表的样式和属性进行设置的操作，包含部分单元格样式、筛选器和报表的整体设置功能。
3. 表格界面：类Excel的表格设计界面，可直接录入文本，输入单元格公式，也可以绑定数据模型字段；可以和Excel一样设置单元格样式和文本样式。
4. 单元格设置：可以设置每个单元格的类型，包括普通文本，单元格公式，数据字段；当类型为数据字段时，可以设置字段的类型，包括分组，聚合，明细。
5. 数据设置及样式设置：可以设置单元格的扩展方向，父格，设置单元格过滤，排序以及报表内页签跳转。
6. 报表名称：可以设置当前报表的名称。
7. 功能按钮：可以预览报表，对报表的编辑进行保存，以及退出到列表页。
8. 页签设置：可以添加或删除页签，并在多页签之间进行切换。

#### 2.2.1数据模型选择区域
中国式报表的底层数据来源均为数据模型。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773771901-2ceda37d-4bff-4305-8d67-6f50f7d00122.png" width="960" title="" crop="0,0,1,1" id="Jn2Fj" class="ne-image">

点击“添加数据模型”按钮，可以展开数据模型的选择界面，界面中显示的是当前用户可用的数据模型；在中国式报表中，支持使用一个或多个数据模型来做为数据来源。







<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773772079-41546e6d-b156-4cfb-95c4-48e2e8ca030c.png" width="210" title="" crop="0,0,1,1" id="fGDhN" class="ne-image">选择具体的数据模型后，可以在左侧数据模型界面中查看该模型的具体字段，只可使用最末级字段进行报表配置，也可以对日期类型的字段进行拆分。

使用时，只需要将需要的字段拖拽到表格区域中对应的单元格即可；对于已经字段使用过的模型，不允许在选择界面中删除。

日期字段会直接拆分为：年，月，日，年-月，年-月-日，月-日。可以直接在报表中引用。

















<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773772247-8f4cdfe2-c28a-4dd1-8b2c-8d284a5900d9.png" width="1268" title="" crop="0,0,1,1" id="zaWa4" class="ne-image">

#### 2.2.2单元格设置
这中国式报表中，所有的单元格内容分为三个类型，普通文本，数据字段以及公式；每一种类型的单元格都有不同的作用。

##### 2.2.2.1 普通文本
直接在单元格中输入文本内容时，单元格即为普通文本单元格，该单元格的内容在配置及预览时的效果一致。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773772507-ba499595-087a-4362-a01c-8fa35dce69cc.png" width="1268" title="" crop="0,0,1,1" id="zvdsV" class="ne-image">

配置界面

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773772681-df19eb57-7729-46ad-a127-7bb35262293f.png" width="1269" title="" crop="0,0,1,1" id="FPM9A" class="ne-image">

预览内容

如果存在可扩展父格，普通文本单元格也会随父格扩展（扩展及父格的详细说明见2.2.3）。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773772899-b62efe6f-4678-4c5c-9bb9-d10957ae6c8a.png" width="1269" title="" crop="0,0,1,1" id="I3yeo" class="ne-image">

配置界面

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773773072-4bf1b943-4edb-4b5c-95ba-676f1b3a8717.png" width="1268" title="" crop="0,0,1,1" id="B3voo" class="ne-image">

预览界面

##### **2.2.2.2 数据字段**
从左侧数据模型界面中拖入字段到单元格中，该单元格自动设置为数据字段。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773773224-017f8cab-b2a8-43e2-8d08-3b503c202a99.png" width="1269" title="" crop="0,0,1,1" id="uvt1H" class="ne-image">

数据字段有三种类型，分组、明细以及聚合；当拖入文本或日期类型字段时，自动设置为分组，当拖入数值类型字段时，自动设置为聚合类型。

如类型为分组，则会按照该字段的所有数据进行分组，并显示所有分组内容，每个分组只出现一次。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773773466-db2021fd-0b35-47a2-a941-0675b48d3599.png" width="672" title="" crop="0,0,1,1" id="P4acv" class="ne-image">

数据字段：分组

如果设置为明细，预览时显示所有数据，不会按照同名称进行分组。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773773611-3f64c4d1-4441-4c03-a5bb-60d5ab92318a.png" width="994" title="" crop="0,0,1,1" id="Zdo35" class="ne-image">

数据字段：明细

如果设置为聚合类型，对于数值类型的字段，可以选择的聚合类型包括：合计，平均，最大值，最小值，计数，去重计数；预览时，会按照选择的聚合类型对数值进行聚合计算。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773773804-50f6dc9c-99f0-4f3e-933e-c4d8dc177f6c.png" width="1267" title="" crop="0,0,1,1" id="F3Tub" class="ne-image">

配置界面

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773773967-1cb34c84-7add-4d6b-a2a0-a05ee21fb330.png" width="1000" title="" crop="0,0,1,1" id="qHfPQ" class="ne-image">

预览界面

对于文本和日期类型的字段，聚合类型包括：最大值，最小值，计数，去重计数；预览时，会按照选择的聚合类型对文本或日期进行聚合计算。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773774158-949420bf-db94-4d52-b9be-f5bd1b4789b2.png" width="1266" title="" crop="0,0,1,1" id="oIFcz" class="ne-image">

配置界面

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773774325-00e385f8-dc7f-4209-a73e-377028a2756e.png" width="780" title="" crop="0,0,1,1" id="W9YEr" class="ne-image">

预览界面

如果存在可扩展父格，数据字段也会根据父格进行扩展，具体规则见2.2.3。

##### **2.2.2.3 公式**
如果在普通文本的单元格中输入等号，并录入一串公式，则该单元格会自动变为公式单元格；也可以在单元格设置中，直接将单元格元素改为公式。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773774509-43aa0d5a-f828-417c-8f82-a8179a38da8d.png" width="1268" title="" crop="0,0,1,1" id="Smw8l" class="ne-image">

可以双击公式单元格打开公式输入界面，也可通过单元格设置中的F(x)按钮打开。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773774667-73c463c3-dbc6-4818-9cc5-fd64e973e3da.png" width="1195" title="" crop="0,0,1,1" id="i9qRs" class="ne-image">

在公式输入界面中，可以快速编辑已有公式，插入报表中支持的公式，并查看所有公式的介绍；修改完成后点击确定，可以修改单元格中原有的公式内容；在公式中，也可以像Excel一样，使用单元格作为公式的参数。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773774889-7bfdbea4-89a5-4cc9-95b8-427cdf1dd489.png" width="1266" title="" crop="0,0,1,1" id="CC0UA" class="ne-image">

配置界面

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773775024-36c3f1a5-198a-4e4d-877f-bffb18bfa22f.png" width="1076" title="" crop="0,0,1,1" id="ev0q6" class="ne-image">

预览界面

公式中的单元格可以是普通文本类型的单元格，也可以是数据字段类型的单元格或者另一个公式类型的单元格，具体的公式介绍请查看章节2.3。

#### 2.2.3数据设置
数据设置是中国式报表中最为重要的部分，可以决定整个表格的数据展示形式，并对展示的数据进行筛选，排序。



##### 2.2.3.1 扩展方向
扩展方向分为无，纵向扩展，横向扩展；对于数据类型单元格，可以确定其数据在预览时的展示方向。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773775235-cd96c4a3-3eb5-42d3-a76a-c1416ecbed03.png" width="1266" title="" crop="0,0,1,1" id="opF1b" class="ne-image">

配置界面：数据类型字段

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773775373-92e74f2a-c1b1-4168-9093-80a2548b133d.png" width="826" title="" crop="0,0,1,1" id="lYv54" class="ne-image">

预览界面：纵向扩展

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773775550-fd5484f0-07b6-45be-a73d-dad0ed0496d0.png" width="864" title="" crop="0,0,1,1" id="yCoW9" class="ne-image">

预览界面：横向扩展



<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773775705-809f24fa-c44e-44bb-9ca7-d2fd0887c3e1.png" width="713" title="" crop="0,0,1,1" id="RPM8g" class="ne-image">

预览界面：无扩展

##### **2.2.3.2 父格**
确定报表展示形式的第二个重要的设置，便是单元格的父格；父格包括左父格和上父格，并都可以选择无父格，默认父格和指定父格；当选择无父格时，则本单元格不会随着父单元格进行扩展；选择默认父格，左父格会自动向本单元格所在行的左侧搜索最近的纵向扩展单元格，上父格会自动向本单元格所在列的上侧搜索最近的横向扩展单元格；选择指定父格，则由用户自己指定单元格进行根据扩展。

通过扩展方向和父格的设置，便可以完成基础的明细表，分组表，主子表以及交叉表的配置。

需要注意，报表中不允许出现父格的循环引用，比如C1的父格为B1，B1的父格为A1，A1的父格为C1。

###### 2.2.3.2.1 明细表
如果在一个父格链路中，存在一个数据类型单元格设置为明细，则该父格链构成的报表就会展示为一个明细表，不会按照数据进行分组合并。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773775889-660d6e5e-db6f-449a-951f-cc15f929518a.png" width="1268" title="" crop="0,0,1,1" id="E5L2p" class="ne-image">

配置界面：有一个单元格设置为明细

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773776116-65cfdd45-16de-41ed-b1bf-947513d72e0e.png" width="1266" title="" crop="0,0,1,1" id="P2184" class="ne-image">

预览界面

###### 2.2.3.2.2 分组表
如果在一个父格链路中，不存在明细类型的数据字段单元格，并且扩展方向一致，则会形成一个分组表。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773776317-6ba40fd3-2900-493e-bc9e-3a2b4b8c93ce.png" width="1266" title="" crop="0,0,1,1" id="tqZrJ" class="ne-image">

配置界面

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773776580-69023938-8d2c-476d-8793-228697c4bf37.png" width="1269" title="" crop="0,0,1,1" id="JK2u5" class="ne-image">

预览界面

在扩展时，各单元格都会跟随其父格的扩展进行相应的扩展，每个子格的查询都相当于在数据中按照父格的条件进行数据筛选；对于聚合类型的字段单元格，相当于过滤有所有父格的条件后进行的聚合。如上述示例，预览界面D2单元格中的数值30000，即为“支付方式”=“保函”且“收款类型”=“甲方奖励”时“收款金额”的合计数值。当一个单元格扩展后，对应的子格数量大于1，则本单元格会自动合并对应数量的单元格，如预览界面B3单元格，对应了三个子格。

###### 2.2.3.2.3 主子表
主子表可以当作一种特殊类型的分组表，当分组表的父格链路中的某个单元格不在报表中的同一行，存在跨行的情况时，则该分组表将以主子表的形式展现。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773776830-aa34427d-ca69-4a0d-ae28-4ac1c1728e8a.png" width="1268" title="" crop="0,0,1,1" id="brkYB" class="ne-image">

其他配置保持默认不变，将B3单元格的左父格设置为自定义，并指向B2。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773777060-cd83e21f-4466-423f-b2b1-c7ea29df2715.png" width="1268" title="" crop="0,0,1,1" id="P27YN" class="ne-image">

预览界面

主子表经常会用作主子单据的展示，比如主表为付款申请的主要信息，子表为申请单的明细内容。



###### 2.2.3.2.4 交叉表
如果在一个报表区域中，一个父格链中既存在纵向扩展，又存在横向扩展；部分单元格的左父格是纵向扩展单元格，上父格是横向扩展单元格时，该报表将展示为交叉表。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773777330-6227e39f-dbf6-4a3b-b439-20152306d872.png" width="1268" title="" crop="0,0,1,1" id="BNj5d" class="ne-image">

配置界面：C2单元格设置为横向扩展

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773777559-d7c2e147-b8ea-485a-bbee-32fbe68dcf27.png" width="1268" title="" crop="0,0,1,1" id="QMZno" class="ne-image">

配置界面：C3单元格父格设置默认，其左父格为B3，上父格为C2

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773777801-9f86e22a-45fc-41d6-a1dc-60b373b0d8d0.png" width="1265" title="" crop="0,0,1,1" id="E8foJ" class="ne-image">

预览界面

可以看见，交叉点的单元格会同时跟随上父格与左父格进行扩展。其中，预览界面D4单元格282000，即为“支付方式”=“转账”且“收款类型”=“进度款”时“收款金额”的合计数值。

##### **2.2.3.3 单元格过滤**
在中国式报表中，可以通过筛选器和单元格过滤，对需要展示的内容进行数据的筛选，本章节将介绍单元格过滤。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773777991-8dff425f-cc81-48d4-95fd-37f9b5b8fe11.png" width="1266" title="" crop="0,0,1,1" id="ToXdW" class="ne-image">

对于所有的数据类型的单元格，可以在右侧设置面板的数据设置页签中，对于单元格过滤进行设置。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773778167-de4f019d-182f-411b-b9f9-ec1c86d9b879.png" width="1004" title="" crop="0,0,1,1" id="kH1Nt" class="ne-image">

针对多个过滤条件，在过滤时有两种类型，满足下述所有条件和满足下述任一条件；满足下述所有条件表示展示的数据需要满足设置的所有条件，如果存在一项不满足都不会进行展示；满足下述任一条件表示展示的数据需要满足设置的至少一个条件即可。

在一个父格链中，父格的条件会传递给其所有子格，子格的条件不会影响父格。如下述示例，不设置过滤时显示为：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773778311-6e8e9e2b-4479-4cd4-9094-2d961b400142.png" width="1266" title="" crop="0,0,1,1" id="WQOBa" class="ne-image">

配置界面

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773778504-8c545bac-64a0-4530-b5cf-65f98310c66e.png" width="886" title="" crop="0,0,1,1" id="Mu5B7" class="ne-image">

预览界面

对B2单元格进行单元格过滤设置，条件为“支付方式.选项名称”等于常量“转账”。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773778691-f91a10ca-75d0-4cea-af4e-2cbfffef85fe.png" width="1202" title="" crop="0,0,1,1" id="A4LIc" class="ne-image">

预览结果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773778894-a68f3a1e-867b-4540-83a7-ef7c2b88bafb.png" width="1267" title="" crop="0,0,1,1" id="dCbHU" class="ne-image">

如果在C2单元格中设置相同的过滤条件，则展示结果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773779055-2b105ab7-bdad-49d3-a401-48c70c5a2239.png" width="1094" title="" crop="0,0,1,1" id="gwruJ" class="ne-image">

基于上述特性，可以支持在同一个报表中展示不同类型，不同时间周期的数据。比如，需要在报表中查看本年金额与累计金额，如下表：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773779242-62f74a81-02a1-410a-b910-d2ef90a3bce7.png" width="1267" title="" crop="0,0,1,1" id="ZVpi3" class="ne-image">

其中C3和D3单元格使用相同的“收款金额”字段，在C3单元格中设置单元格过滤，设置条件“收款登记.收款日期”为“今年”；D3单元格不进行设置。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773779489-11e02e62-c474-4ec2-b438-1eb2013a454b.png" width="1088" title="" crop="0,0,1,1" id="PL1ac" class="ne-image">

因为C3单元格和D3单元格的默认父格皆为左侧最近的纵向扩展单元格B3，即C3单元格的过滤条件不会影响D3单元格，则预览结果如下。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773779652-d37aaef4-526e-40bd-99db-5db8ee667727.png" width="1268" title="" crop="0,0,1,1" id="kUNt0" class="ne-image">

##### **2.2.3.4 单元格排序**
在中国式报表中，可以通过单元格排序功能来进行数据的排序展示。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773779813-04ea5807-c7ea-41bc-90b0-ed776d97a6ee.png" width="1162" title="" crop="0,0,1,1" id="UF5cO" class="ne-image">

点击单元格，在右侧面板的数据设置页签中，可以添加单元格排序。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773779987-e9103b7c-400c-4631-a29c-36dc2cd38d4e.png" width="1147" title="" crop="0,0,1,1" id="fimJV" class="ne-image">

在单元格排序中，支持常规类型和指定单元格进行排序；选择常规时，本单元格会按照自己的数据，在同一父格下进行排序；选择指定单元格时，本单元格会按照指定单元格的数据进行排序。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773780157-9db2d1cf-0ce7-4368-8ba7-8c32e349b619.png" width="912" title="" crop="0,0,1,1" id="YSCgb" class="ne-image">

如上图所示，当前报表在不进行排序时，所有数据虽然会按照字段进行分组，但是日期是无序显示的。

首先我们给日期进行排序，让每个项目下的收款日期升序显示；点击C3单元格，添加单元格排序，使用常规类型，升序。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773780384-6b58f7fe-d796-4070-90b9-c2e9cf6f8c8a.png" width="699" title="" crop="0,0,1,1" id="wb83s" class="ne-image">

设置后，在报表配置界面中，该单元格左上角会显示图标，提示用户该单元格进行了单元格的排序设置，右侧面板中，单元格排序右侧也会显示排序类型。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773780577-51a0851c-68d6-4827-a031-278093468111.png" width="1267" title="" crop="0,0,1,1" id="IEDtW" class="ne-image">

设置后，进行报表预览，结果如下。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773780803-9440003c-8ce7-401a-a4cd-9e8908af876b.png" width="780" title="" crop="0,0,1,1" id="q8zZk" class="ne-image">

此时，每个项目下的收款日期都按照升序进行显示。

接着，我们按照各项目的合计收款金额，对项目进行降序排列；按照下图对报表样式进行修改。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773780989-53dd0af4-6237-44ba-8ffb-33db47644dd5.png" width="1135" title="" crop="0,0,1,1" id="mbsEO" class="ne-image">

点击B3单元格，添加单元格排序，选择指定单元格，并指向D4，选择降序排列。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773781135-1d6cb9b5-fabe-4af1-9661-b6d111cbb03f.png" width="697" title="" crop="0,0,1,1" id="DRnwG" class="ne-image">

最终结果如下图：项目按照合计收款金额进行降序排列，每个项目下的收款日期升序排列。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773781296-6d7d37d8-1440-415a-a653-81ceb15c09ee.png" width="854" title="" crop="0,0,1,1" id="ZdSwU" class="ne-image">

##### **2.2.3.5 单元格跳转**
对于很多报表，会存在多个页签，在第一个页签中列出目录，通过点击单元格跳转至其他页签，如下图。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773781482-6a2e92f9-1a63-43e5-8232-36f569a3e767.png" width="571" title="" crop="0,0,1,1" id="YHfhk" class="ne-image">

只需要在报表配置界面中，对需要设置跳转的单元格添加跳转链接，并指定需要跳转的页签即可。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773781725-c75145cf-27b0-4a04-9fa9-ae121a3ac5f0.png" width="1268" title="" crop="0,0,1,1" id="S0Kp4" class="ne-image">

#### 2.2.4样式设置
和EXCEL相似，中国式报表也支持对文本、单元格进行样式及格式的设置。



##### **2.2.4.1 格式**
与Excel类似，中国式报表中的单元格也可以设置单元格的格式，包括常规，文本，日期，数值，百分比。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773781875-8f2e5a83-9027-49bc-b10b-8561ee610a92.png" width="333" title="" crop="0,0,1,1" id="ZD5Hx" class="ne-image">

设置格式为日期时，可以设置日期的显示格式，并按照设置进行数据预览：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773782107-dfe07908-2a50-4ac5-bfe0-1f20acb92d03.png" width="331" title="" crop="0,0,1,1" id="C5gv3" class="ne-image">

设置格式为数值或百分比时，可以设置数据的小数位数：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773782320-040092c2-d3e1-42d6-85d8-db6e528e6be2.png" width="333" title="" crop="0,0,1,1" id="xiT6g" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773782443-f64d4b55-744c-48df-bfef-1293572f3b7e.png" width="329" title="" crop="0,0,1,1" id="IT0zq" class="ne-image">

##### **2.2.4.2 文本样式**
与Excel相同，在中国式报表中也可以设置文本样式，包括字体、字号、颜色、粗体、斜体、下划线、删除线，也可以为文本设置对齐方式，包括上下对齐以及左右对齐。

1. 字体目前支持微软雅黑、仿宋、黑体、楷体、宋体。
2. 字号设置支持最小9号字，最大72号字。
3. 字体颜色支持调色板。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773782587-4bcd8488-5b7a-4b62-ac75-d4113f18a56c.png" width="222" title="" crop="0,0,1,1" id="rGkkq" class="ne-image">

##### **2.2.4.3 单元格样式**
中国式报表中，也支持对单元格样式进行设置，包括单元格背景颜色、单元格边框以及单元格合并。

如果单元格的子格扩展后数量多于1，则该单元格会自动进行扩展合并，不需要进行手动设置。



##### **2.2.4.4 Excel内容粘贴**
为方便用户使用，中国式报表支持直接将Excel内容复制粘体进设计器中，不需要重新设置样式。



#### **2.2.5 筛选器**
在中国式报表中，支持用户设置筛选器，在报表预览时按照需要对报表数据进行筛选。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773782759-5d255003-6767-49a4-bf00-09a6a93ec556.png" width="1266" title="" crop="0,0,1,1" id="TYN35" class="ne-image">

筛选器设置按钮

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773783021-f877d93e-852b-4dff-b1f5-64060016622f.png" width="955" title="" crop="0,0,1,1" id="p0RK8" class="ne-image">

筛选器设置界面

将需要筛选的字段从字段选择区域拖入已选字段区域，然后设置每个字段的筛选属性即可。

##### 2.2.5.1 选择筛选
字段拖入已选字段区域后，会自动成为一个选择筛选器，可以修改标题名称，支持单选及多选，可以设置该筛选器在那些页签生效，并支持过滤当前数据模型或设置跨模型进行数据过滤。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773783206-db3f6255-f5cc-4c4f-9110-561c74c5de8a.png" width="953" title="" crop="0,0,1,1" id="oa245" class="ne-image">

1. 选项名称修改后，在报表预览时会显示设置的标题。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773783388-3643a1c3-d567-4217-94e6-71984a092b0d.png" width="957" title="" crop="0,0,1,1" id="JG4NQ" class="ne-image">

配置界面：修改标题名称

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773783559-35f38d3a-4b56-40cf-8b60-4577dca88003.png" width="943" title="" crop="0,0,1,1" id="UcEXA" class="ne-image">

预览界面：显示修改后的筛选器名称

1. 单选及多选设置，会影响报表预览时筛选器的类型。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773783782-79582f35-6da7-46d1-a121-ec9549892d07.png" width="902" title="" crop="0,0,1,1" id="IV1uM" class="ne-image">

预览界面：单选

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773783947-38d06c0a-0c73-4ce9-8576-7500c45b4a88.png" width="861" title="" crop="0,0,1,1" id="f07St" class="ne-image">

预览界面：多选

1. 筛选器只对设置了生效的页签进行数据过滤，其他页签的数据不会随着筛选器内容的变化而变化。
2. 勾选当前模型数据过滤，则使用相同模型的报表内容会按照筛选器的内容进行数据过滤，该选项默认勾选。
3. 如果报表的数据由多个数据模型的内容生成，则可以设置跨模型数据过滤，报表数据会按照设置的字段映射进行数据过滤。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773784096-8f5cb08d-a7b8-4f7f-8ce7-8e27845bbd53.png" width="953" title="" crop="0,0,1,1" id="AzPCZ" class="ne-image">

##### **2.2.5.2 日期筛选**
对于日期类型的字段，除了选择筛选外，还支持日历筛选。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773784279-566e17b4-80bb-4294-9596-33459d21c951.png" width="953" title="" crop="0,0,1,1" id="P1NlR" class="ne-image">

对于日期类型筛选，支持等于和介于筛选器，也可以设置日期类型，目前支持年月日，年月，年。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773784433-04e2237e-8b1b-4e68-92fc-dcb33c4d1e20.png" width="993" title="" crop="0,0,1,1" id="JZ96D" class="ne-image">

等于类型日期筛选器

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773784604-6f6ded0f-1024-44d3-af2c-4d23f7a01a43.png" width="1251" title="" crop="0,0,1,1" id="dP4La" class="ne-image">

介于类型日期筛选器

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773784793-cc6c5f28-248d-4900-803b-f01cdbad3235.png" width="1243" title="" crop="0,0,1,1" id="n5vGs" class="ne-image">

日期类型为年月

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773785017-85734d22-a4df-486b-93bd-6d48e3405497.png" width="1253" title="" crop="0,0,1,1" id="VruVA" class="ne-image">

日期类型为年

##### **2.2.5.3 在单元格过滤中使用筛选器**
在单元格过滤中，除了使用常量和字段外，也可以使用筛选器的内容作为过滤的条件。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773785185-5aaea7bc-fe81-479d-9cc1-7b6dc00da4b8.png" width="955" title="" crop="0,0,1,1" id="DwQFe" class="ne-image">

筛选器中，可选择在当前页签生效的所有筛选器，如果是日期类筛选器，会显示日期-开始和日期结束。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773785334-652c3eda-605a-49f4-a756-f8c4ffc9b005.png" width="965" title="" crop="0,0,1,1" id="MTn7w" class="ne-image">

日期-开始和结束代表日期筛选器的起始日期。

1. 如果是等于类型，选择“2024-08-10”，则日期-开始的值为2024-08-10 00:00:00.000，日期-结束为2024-08-10 23:59:59.999。
2. 如果是等于类型，选择“2024-08”，则日期-开始的值为2024-08-01 00:00:00.000，日期-结束为2024-08-31 23:59:59.999。
3. 如果是介于类型，选择“2024-08-10～2024-08-23”，则日期-开始的值为2024-08-10 00:00:00.000，日期-结束为2024-08-23 23:59:59.999。

如果过滤时选择日期自定义，则筛选器内日期值显示日期，值为当前日期的区间。

在报表查询时，需要按照筛选器的内容过滤数据，如下图：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773785516-75640cd4-1b56-44b6-a5d0-170ac89727f8.png" width="1266" title="" crop="0,0,1,1" id="GtMRs" class="ne-image">

需要在报表查询时选择月份，并显示截止上月底收款金额，当月收款金额和截止当月底收款金额。

首先设置筛选器，如下图。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773785735-e5e62abb-a016-48b7-b546-6ed0cbea5c29.png" width="957" title="" crop="0,0,1,1" id="CTxtW" class="ne-image">

设置比较类型为等于，日期类型为年月，取消勾选当前模型数据过滤。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773785897-bfae1070-8d5f-4c70-b97c-e9ad751cf08a.png" width="1230" title="" crop="0,0,1,1" id="osgCV" class="ne-image">

对于D3单元格，设置单元格过滤，“收款日期”早于筛选器“收款日期-开始”。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773786068-00973836-cc08-49ac-bdb7-212c18fe31cf.png" width="1236" title="" crop="0,0,1,1" id="dPdOm" class="ne-image">

对于E3单元格，设置单元格过滤，“收款日期”自定义值为“收款日期”。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773786266-ef5dc851-c67e-4624-a093-c0595978d409.png" width="1234" title="" crop="0,0,1,1" id="bMwDD" class="ne-image">

对于F3单元格，设置单元格过滤，“收款日期”早于等于筛选器“收款日期-结束”。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773786435-c6fe01da-6843-4ea5-89ef-861e0e9422f7.png" width="1045" title="" crop="0,0,1,1" id="tcbE3" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773786592-173275dc-7461-4bc9-8651-b9688dc91cd1.png" width="1049" title="" crop="0,0,1,1" id="wAoMn" class="ne-image">

预览效果如上。

### 2.3单元格公式
在中国式报表中，可以使用与Excel公式相似的单元格公式，利用已有的数据计算出新的数据内容。

#### 2.3.1 聚合公式
聚合公式包括SUM,AVG,MAX,MIN,COUNT,UNIQUECOUNT六种，用以计算多个单元格的聚合数据。

##### 2.3.1.1 SUM(取合计)
SUM公式用以计算合计，参数可以是数值常量，单元格（数值内容或扩展后为数值），公式（计算后为数值），如果参数是非数值，则记为0。

示例：

SUM(100,321)=421

SUM(ABS(-22),111,222)=355

SUM(E2)计算在与E2的同最近父格下扩展出的所有E2的值的合计，如果没有相同父格，则取所有扩展出的E2单元格。

报表示例：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773786758-a6a16ec0-e2cf-4b93-8f4a-810187614d74.png" width="1269" title="" crop="0,0,1,1" id="PwJkl" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773786984-bfdc558b-2fcf-49e6-bb9c-a9e81b84600b.png" width="762" title="" crop="0,0,1,1" id="kVl2r" class="ne-image">

需要给上述报表添加按照项目名称汇总的各项目小计。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773787141-05865e17-b3ad-4b54-9f8c-224e6dc37ad6.png" width="1266" title="" crop="0,0,1,1" id="XVVPn" class="ne-image">

将A2单元格与A3单元格进行合并，B3单元格输入文本“小计”，C3单元格输入公式“SUM(C2)”，最终效果如下图。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773787356-81d969ba-7108-4d1f-b5ca-6ca1c1fe15de.png" width="893" title="" crop="0,0,1,1" id="cF5eq" class="ne-image">

也可以不增加行，在原表右侧添加小计：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773787536-55384e16-2cdf-429b-94c7-e89b28537421.png" width="1266" title="" crop="0,0,1,1" id="pashE" class="ne-image">

设置B2单元格的左父格自定义，指向D2；D2单元格的左父格自定义，指向A2，预览效果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773787809-d4866bb6-2b16-467b-a2cc-4dba9be70b18.png" width="917" title="" crop="0,0,1,1" id="Hb2T5" class="ne-image">

只要设置合理的父格链路，可以实现更多的表格样式。

##### **2.3.1.2 AVG(取平均值)**
AVG公式用以计算平均值，参数可以是数值常量，单元格（数值内容或扩展后为数值），公式（计算后为数值），如果参数是非数值，则记为0。最后一个参数为bool值，不输入则为False，代表非数值不计数，如果为True，则计数。

示例：

AVG(100,321)=210.5

AVG(ABS(-22),111,222)=118.33

AVG(122,’文本’)=122

AVG(122,’文本’,True)=61

AVG(E2)计算在与E2的同最近父格下扩展出的所有E2的值的平均，如果没有相同父格，则取所有扩展出的E2单元格。

报表示例：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773787994-729fb346-c8ca-46a1-a905-10810403f225.png" width="1267" title="" crop="0,0,1,1" id="F9D3y" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773788154-4b0ab0a6-57e0-40d1-bfe4-27b8f1beb562.png" width="1054" title="" crop="0,0,1,1" id="oWYG0" class="ne-image">

需要给上述报表添加各学生的平均成绩和各学科的平均成绩。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773788373-6ee4b7a8-d62c-4860-aa5a-6c0491f7f1e6.png" width="1266" title="" crop="0,0,1,1" id="SlUGd" class="ne-image">

如上图所示修改表格后，设置D1单元格扩展方向为横向扩展，B4单元格扩展方向为纵向扩展（交叉表内行列标题文本均需要设置为当前方向的扩展），D3和C4均设置为公式单元格，公式为“AVG(C3)”，最终结果如下图。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773788517-e95c3d7b-51c6-49fa-991a-4ccab808c444.png" width="1146" title="" crop="0,0,1,1" id="ZoIML" class="ne-image">



##### **2.3.1.3 MAX(取最大值)**
MAX公式用以计算最大值，参数可以是数值常量，单元格（数值内容或扩展后为数值），公式（计算后为数值），如果参数是非数值，则记为0。

示例：

MAX(100,321)=321

MAX(ABS(-22),111,222)=222

MAX(E2)计算在与E2的同最近父格下扩展出的所有E2的值的最大值，如果没有相同父格，则取所有扩展出的E2单元格。

公式使用方式和AVG相似，可参照AVG公式的报表示例。

##### **2.3.1.4 MIN(取最小值)**
MIN公式用以计算最小值，参数可以是数值常量，单元格（数值内容或扩展后为数值），公式（计算后为数值），如果参数是非数值，则记为0。

示例：

MIN(100,321)=100

MIN(ABS(-22),111,222)=22

MIN(E2)计算在与E2的同最近父格下扩展出的所有E2的值的最小值，如果没有相同父格，则取所有扩展出的E2单元格。

公式使用方式和AVG相似，可参照AVG公式的报表示例。

##### **2.3.1.5 COUNT(计数)**
COUNT公式用以计数，参数可以是任意类型字段，

示例：

COUNT(100,321)=2

COUNT(ABS(-22),111,222)=3

COUNT(E2)计算在与E2的同最近父格下扩展出的所有E2的个数，如果没有相同父格，则取所有扩展出的E2单元格。

公式使用方式和AVG相似，可参照AVG公式的报表示例。

##### **2.3.1.6 UNIQUECOUNT(去重计数)**
UNIQUECOUNT公式用以去重计数，参数可以是任意类型字段，

示例：

UNIQUECOUNT(100,321)=2

UNIQUECOUNT(100,321,321)=2

UNIQUECOUNT(ABS(-22),111,222)=3

UNIQUECOUNT(E2)计算在与E2的同最近父格下扩展出的所有E2的去重个数，如果没有相同父格，则取所有扩展出的E2单元格。

公式使用方式和AVG相似，可参照AVG公式的报表示例。

#### 2.3.2 数学公式
数学公式包括ABS，FLOOR，ROUND三种，用以进行单元格内容的数学运算。

##### **2.3.2.1 ABS(取绝对值)**
ABS公式用以计算数据的绝对值，参数可以是数值常量，单元格（数值内容或扩展后为数值），公式（计算后为数值），如果参数是非数值，则记为0；如果是扩展后的多个单元格，则只计算第一个。

示例：

ABS(100)=100

ABS(-123)=123

ABS(‘文本’)=0

ABS(E2)计算在与E2的同最近父格下扩展出的所有E2中第一个值的绝对值，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。

##### **2.3.2.2 FLOOR(向下取整)**
FLOOR公式用以对数据进行向下取整操作，参数可以是数值常量，单元格（数值内容或扩展后为数值），公式（计算后为数值），如果参数是非数值，则记为0；如果是扩展后的多个单元格，则只计算第一个。

示例：

FLOOR(100.8)=100

FLOOR(-123.3)=-124

FLOOR(‘文本’)=0

FLOOR(E2)计算在与E2的同最近父格下扩展出的所有E2中第一个值的向下去整，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。

##### **2.3.2.3 ROUND(四舍五入指定位数)**
ROUND公式用以对数据进行四舍五入操作，参数A可以是数值常量，单元格（数值内容或扩展后为数值），公式（计算后为数值），如果参数是非数值，则记为0；如果是扩展后的多个单元格，则只计算第一个；参数B为保留的小数位数，只接受整数参数。

示例：

ROUND(100.833,2)=100.83

ROUND(-123.363,1)=-123.4

ROUND(‘文本’,3)=0.000

ROUND(E2,2)计算在与E2的同最近父格下扩展出的所有E2中第一个值进行四舍五入，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。

#### 2.3.3 文本公式
文本公式包括CONCATENATE,FORMAT,LEFT,RIGHT,MID五种，用以处理单元格文本内容。

##### **2.3.3.1 CONCATENATE(多文本合并)**
CONCATE公式用以对文本进行连接，参数可以是任意类型；如果是扩展后的多个单元格，则只对第一个单元格进行关联。

示例：

CONCATE(‘中国式’,’报表’)=‘中国式报表’

CONCATE(‘表格’,2123)=‘表格2123’

CONCATE(E2,‘中’)将E2的同最近父格下扩展出的所有E2中第一个值进行连接，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。

报表示例：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773788711-36f6685f-c8ec-4e47-a88f-1425bff785e0.png" width="1200" title="" crop="0,0,1,1" id="SKwuC" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773788920-5b7604b1-3004-49be-b058-9ea601661615.png" width="1061" title="" crop="0,0,1,1" id="S02dD" class="ne-image">

在上述报表中，因为数据行数较多，小计显示不明显，也容易混淆；用户可以将项目名称也添加到小计单元格中，显示为某某项目小计，可以更加显眼。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773789103-fb71870b-3d7b-43bc-a0ef-b9acdc627927.png" width="1196" title="" crop="0,0,1,1" id="SN93T" class="ne-image">

修改C3单元格为公式，在公式中录入“CONCATENATE(B2,’小计’)”。最终显示效果如下图：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773789348-1f34ec0e-019d-4600-aea2-1e6ac6939c84.png" width="1036" title="" crop="0,0,1,1" id="hU0aS" class="ne-image">



##### **2.3.3.2 FORMAT(文本格式化)**
FORMAT公式用以对内容进行格式转换，参数A为日期或文本字段，参数TYPE为转换后的格式，可以为日期（yyyy-MM），如果是扩展后的多个单元格，则只对第一个单元格进行关联。可使用日期类型：yyyy,yy,MM,M,dd,d,hh,h,mm,m,ss,s

示例：

FORMAT(‘2014-02-03’,’yyyy-MM’)=‘2014-02’

FORMAT(E2,’yyyy-MM’)将E2的同最近父格下扩展出的所有E2中第一个值进行格式转换，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。

报表示例：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773789552-d413cd65-f5b3-4a55-8d50-84ee5d2e80b7.png" width="1266" title="" crop="0,0,1,1" id="phVxo" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773789716-5a4e0a13-39a9-4fe0-a584-0ee07ca81bbe.png" width="1104" title="" crop="0,0,1,1" id="BAuYX" class="ne-image">

在报表的配置中，经常会有配置制单日期的要求，如果只使用日期函数获取当前日期，可能无法满足对格式的要求，这时便可以使用格式化函数。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773789888-81a8b077-476c-46e6-984f-bbe1be49f1c6.png" width="1266" title="" crop="0,0,1,1" id="sJNri" class="ne-image">

对于C6单元格，设置公式FORMAT(TODAY(),'yyyy年MM月dd日')，并设置上父格为无（默认上父格会自动指向C3，会受横向扩展的影响），最终效果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773790151-b95cf2be-b92e-4251-9f7d-8fd6f30c4452.png" width="1269" title="" crop="0,0,1,1" id="Sa9js" class="ne-image">

##### **2.3.3.3 LEFT(从左提取文本)**
LEFT公式用以对内容从左开始截取，一共截取num个字符；参数A可以是任意类型；参数num为需要截取的位数，位数为大于0的整数如果是扩展后的多个单元格，则只对第一个单元格内容进行截取。

示例：

LEFT(‘2014-02-03’,3)=‘201’

LEFT(‘从左开始截取’,3)=‘从左开’

LEFT(E2,3)将E2的同最近父格下扩展出的所有E2中第一个值进行截取，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。

##### **2.3.3.4 RIGHT(从右提取文本)**
RIGHT公式用以对内容从右开始截取，一共截取num个字符；参数A可以是任意类型；参数num为需要截取的位数，位数为大于0的整数，如果是扩展后的多个单元格，则只对第一个单元格内容进行截取。

示例：

RIGHT(‘2014-02-03’,3)=‘-03’

RIGHT(‘从左开始截取’,3)=‘始截取’

RIGHT(E2,3)将E2的同最近父格下扩展出的所有E2中第一个值进行截取，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。

##### **2.3.3.5 MID(从中提取文本)**
MID公式用以对内容从第num1位开始截取，一共截取num2个字符；参数A可以是任意类型；参数num为需要截取的位数，位数为大于0的整数，如果是扩展后的多个单元格，则只对第一个单元格内容进行截取。

示例：

MID(‘2014-02-03’,3,3)=‘14-’

MID(‘从左开始截取’,3,2)=‘开始’

MID(E2,3,1)将E2的同最近父格下扩展出的所有E2中第一个值进行截取，如果没有相同父格，则取所有扩展出的E2单元格的第一个值。





#### 2.3.4 日期时间公式
日期时间公式包括TODAY,NOW,DATEDIF,DATEOFFSET,YEAR,MONTH,DAY七种，用以处理时间相关的计算。

##### **2.3.4.1 TODAY(当前日期)**
TODAY公式用以获取当前日期。

示例：

TODAY()=‘2024-07-09’

##### **2.3.4.2 NOW(当前日期时间)**
NOW公式用以获取当前日期时间。

示例：

NOW()=‘2024-07-09 10:31:30’

##### **2.3.4.3 DATEDIF(两个日期的差值)**
DATEDIF公式用以获取两个时间日期字段的差距，计算类似于DATE2-DATE1。TYPE参数为差别的类型，可以为’Y’,’M’,’D’,’H’数据向下取整

示例：

DATEDIF(‘2024-07-09’,‘2024-07-12’,‘D’)=3

DATEDIF(‘2024-07-09’,‘2024-07-12’,‘M’)=0

##### **2.3.4.4 DATEOFFSET(日期加减)**
DATEOFFSET公式用以给一个日期计算num日期后的日期。TYPE参数为日期增加的类型，可以为’Y’,’M’,’D’,’H’

示例：

DATEOFFSET(‘2024-07-09’,‘Y’,2)=‘2026-07-09’

DATEOFFSET(‘2024-07-09’,‘D’,-2)=‘2024-07-07’

DATEOFFSET(‘2024-07-09’,‘H’,1)=‘2024-07-09’(为日期添加时间差，不改变原始数据)

##### **2.3.4.5 YEAR(日期中的年)**
YEAR公式用以获取一个日期数据的年份，非日期类型或无法转换成日期类型的文本返回空

示例：

YEAR(‘2024-07-09’)=2024

YEAR(‘2024-07’)=‘’

YEAR(‘日期’)=‘’

##### **2.3.4.6 MONTH(日期中的月)**
MONTH公式用以获取一个日期数据的月份，非日期类型或无法转换成日期类型的文本返回空

示例：

MONTH(‘2024-07-09’)=7

MONTH(‘2024-07’)=‘’

MONTH(‘日期’)=‘’

##### **2.3.4.7 DAY(日期中的日)**
DAY公式用以获取一个日期数据的日，非日期类型或无法转换成日期类型的文本返回空

示例：

DAY(‘2024-07-09’)=9

DAY(‘2024-07’)=‘’

DAY(‘日期’)=‘’

#### 2.3.5 逻辑公式
逻辑公式包括IF,AND,OR三种，用以处理各种逻辑问题。

##### **2.3.5.1 IF(如果……就……否则)**
IF公式用以逻辑判断，bool参数为bool值数据，可以是常量，数据字段，单元格内容，或者判断条件。当bool值为true，执行condition_true；当bool值为false，执行condition_false

示例：

IF(2>1,’大于’,‘小于’)=‘大于’

IF(E3>100,’大型’,‘小型’)=‘小型’（E3单元格为90）

报表示例：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773790393-e3efa664-6a9a-4681-8f99-47ca16c5d746.png" width="1267" title="" crop="0,0,1,1" id="pEZtN" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773790536-9c10ae86-c90e-40e5-8842-087cf6629046.png" width="1095" title="" crop="0,0,1,1" id="nmOep" class="ne-image">

在上面的报表中，需要给各学生按照平均成绩评级，90以上为优，85-90为良，其他为中，配置如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773790708-a253e58f-bc93-4b0f-b3a5-8d5d3028a5ab.png" width="1267" title="" crop="0,0,1,1" id="bEost" class="ne-image">

其中，D3单元格设置为公式，内容为IF(AVG(C3)>90,'优',IF(AVG(C3)>85,'良','中'))，最终预览结果如下。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773790865-7792c76c-d1fd-466d-be9a-6993fb7bf258.png" width="1266" title="" crop="0,0,1,1" id="i9mWz" class="ne-image">

##### **2.3.5.1 AND(且)**
AND公式用以逻辑判断，当所有条件都为真时返回true，否则返回false

示例：

AND(2>1,3>2)=true

AND(E3>100,’大型’)=true（E3单元格为110,非空常量返回true）

##### **2.3.5.1 OR(或)**
OR公式用以逻辑判断，当任意条件为真时返回true，否则返回false

示例：

OR(1>2,3>2)=true

OR(E3<100,’大型’)=true（E3单元格为110,非空常量返回true）

#### 2.3.6 报表公式
报表公式包括ROWSEQ，COLSEQ两种，用以为报表添加序号。

##### **2.3.6.1 ROWSEQ(行序号)**
ROWSEQ公式用以返回其左父格的序号,如果无父格，则返回1。

示例：

ROWSEQ()=10

报表示例：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773791056-aebde6b3-dc4b-41e0-a58c-3171875499af.png" width="1267" title="" crop="0,0,1,1" id="bt3bU" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773791310-fed926af-0489-4ba5-a06d-d112e8ee5add.png" width="1007" title="" crop="0,0,1,1" id="t3Q7m" class="ne-image">

上述报表，需要给列表添加编号，配置如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773791581-6c623fb5-faf2-4cb9-9867-62085c35022f.png" width="1267" title="" crop="0,0,1,1" id="Civpd" class="ne-image">

A3单元格设置为公式，内容为ROWSEQ()，并指定其左父格为自定义，指向B3；为了结果更加可读，给B3单元格添加排序，类型为常规，升序。

最终预览结果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773791820-74c83d7f-cbef-443d-80c5-62aeab1a4f14.png" width="1080" title="" crop="0,0,1,1" id="OQZyz" class="ne-image">

##### **2.3.6.2 COLSEQ(列序号)**
COLSEQ公式用以返回其上父格的序号,如果无父格，则返回1。

示例：

COLSEQ()=10

序列号与行序号的使用方式相似，可参照ROWSEQ公式设置。

### 2.4 报表预览
<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773792040-bdb91287-9e02-4e6b-b6f1-aa718c98fdaf.png" width="1267" title="" crop="0,0,1,1" id="cAwAi" class="ne-image">

#### 2.4.1 数据查询
在编辑页面点击预览，或者直接在报表列表内点击报表名称，即可进行报表查询。

#### 2.4.2 表格导出
中国式报表支持将预览的结果导出成Excel，只需要预览界面点击右上角的导出按钮即可。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773792164-709894a8-6bc7-4aa4-814b-ca460079213b.png" width="517" title="" crop="0,0,1,1" id="aOoCY" class="ne-image">

### **2.5 报表分享及发布**
为了让企业中的其他人员可以预览自己创建的中国式报表，可以通过分享和发布两种形式实现。

#### 2.5.1 报表分享
当用户需要给企业内其他用户分享自己创建的报表时，可以使用中国式报表的分享功能。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773792357-98b4e9d2-f945-436f-a597-ef17e3a54e14.png" width="1654" title="" crop="0,0,1,1" id="JdFTu" class="ne-image">

在中国式报表的列表页，在需要分享的报表最右侧点击更多按钮，选择分享，会显示分享的弹窗。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773792531-2d7044fd-553d-49ff-982a-b15fedf26d38.png" width="693" title="" crop="0,0,1,1" id="IJn65" class="ne-image">

可以将当前报表的预览，复制，编辑权限分享给本企业中的其他人，支持按照部门，角色，员工进行分享，也可以设置分享给所有人。

需要注意，复制和编辑权限都需要以预览权限为基础；如果只分享了复制权限，没有预览权限，则被分享人依旧无法查看该报表和复制该报表。

#### **2.5.2 报表发布**
为方便企业其他用户使用，中国式报表支持将报表发布为菜单，通过菜单栏查看。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773792680-c939c4d3-690a-4b27-b3e8-38718ce25f15.png" width="1654" title="" crop="0,0,1,1" id="khNYp" class="ne-image">

在中国式报表的列表页，在需要发布的报表最右侧点击更多按钮，选择发布，会显示发布的弹窗。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773792872-bfdb6e1b-3772-47be-ab71-fcbd897bf805.png" width="695" title="" crop="0,0,1,1" id="ZlTxB" class="ne-image">

填写发布后菜单的名称，选择上级菜单，菜单图标后，可以点击发布

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773793025-06cba469-572b-4193-be9c-4a222f48eaea.png" width="697" title="" crop="0,0,1,1" id="mJRLs" class="ne-image">

之后，便可以在菜单列表中找到对应的报表进行预览。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773793211-fdf0691d-f210-4129-8da6-69160f3dedd8.png" width="1159" title="" crop="0,0,1,1" id="WzDZF" class="ne-image">

## 3  报表应用
### 2.1  多维分组计算
#### 2.1.1  分组聚合及单元格计算
某企业需要对自己的材料采购合同进行分析，原始的报表样式如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773793398-0072159a-b8ec-464b-9146-2b8513cfe5c3.png" width="1269" title="" crop="0,0,1,1" id="dO3FU" class="ne-image">

数据预览如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773793641-1c430646-6119-4637-9ee3-c81c519f837e.png" width="1179" title="" crop="0,0,1,1" id="tDsrU" class="ne-image">

因为管理提升，需要在报表中添加更多的分析用字段，包括各项目的总计合同金额，总采购数量，平均单价，以及计算各项目所有合同的平均合同金额，公司所有合同的平均合同金额，以及汇总的所有数据。

修改后的表样如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773793836-d0b6f56c-3102-40b8-b2bc-b181d9ac6bd5.png" width="1267" title="" crop="0,0,1,1" id="WgHDq" class="ne-image">

主要修改内容：

| 单元格 | 内容 | 父格设置 |
| :---: | --- | --- |
| E3 | =SUM(D3)/COUNT(D3) | 左：B3 |
| C3 | 无变更 | 左：E3 |
| D4 | =SUM(D3) | 默认 |
| G4 | =SUM(G3) | 默认 |
| H4 | =I4/G4 | 默认 |
| I4 | =SUM(I3) | 默认 |
| D5 | SUM(D3) | 默认 |
| E5 | =SUM(D3)/COUNT(D3) | 默认 |
| G5 | =SUM(G3) | 默认 |
| H5 | =I5/G5 | 默认 |
| I5 | =SUM(I3) | 默认 |




最终结果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773794087-4575fd31-c326-4819-90ef-d77a47ea07ba.png" width="1334" title="" crop="0,0,1,1" id="ekU5G" class="ne-image">

#### 2.1.2 ** 交叉表多维占比分析**
某公司有一个报表，已交叉表的形式展示各项目各收款类型下的收款金额，配置如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773794391-bee76ea7-63fb-4871-ac39-02e774561762.png" width="1267" title="" crop="0,0,1,1" id="LgKhC" class="ne-image">

原始预览结果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773794625-5e22d1de-da52-4b0c-b9a6-baedb74f32f7.png" width="1220" title="" crop="0,0,1,1" id="Xhk4B" class="ne-image">

因为管理需要，公司需要分析各项目中各类型收款金额在总收款金额的占比，以及各收款类型在各项目中的占比，修改报表样式如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773794807-31bf41ce-d566-4b97-8d33-f4c5bc3ae33c.png" width="1268" title="" crop="0,0,1,1" id="xWl2D" class="ne-image">

主要修改内容：

| 单元格 | 内容 | 父格设置 |
| :---: | --- | --- |
| E4 | =D4/C4 | 默认 |
| F4 | =D4/D5 | 默认 |
| G4 | =C4/C5 | 默认 |


最终结果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773795033-36bb9bf9-9c77-465b-a3f3-de02d96eed23.png" width="1690" title="" crop="0,0,1,1" id="KeDP1" class="ne-image">

### 2.2  多模型报表
#### 2.2.1 单维度过滤
公司在管理项目时，经常需要完整了解一个项目的所有信息，通过这些信息可以确定项目后续的工作；如下图，在项目经营报表中，需要能查看项目的基本信息，收款情况和付款情况。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773795205-122ffbe6-66a9-4d27-993e-3cc2ea560bbb.png" width="1269" title="" crop="0,0,1,1" id="AC9wO" class="ne-image">

在该报表中，会使用到三个数据模型，包括项目信息，收款登记模型和支付记录模型，最终配置如下。

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773795448-a4f87777-040c-47ee-b17e-922c952f0b5b.png" width="1267" title="" crop="0,0,1,1" id="byoWQ" class="ne-image">

主要修改内容：

| 单元格 | 内容 | 父格设置 |
| :---: | --- | --- |
| E5 | 添加单元格过滤，收款类型=“结算款” | 默认 |
| G5 | 添加单元格过滤，收款类型=“进度款” | 默认 |
| E9 | 添加单元格过滤，支付方式=“现金” | 默认 |
| G9 | 添加单元格过滤，支付方式！=“现金” | 默认 |


设置筛选器，添加项目名称的选择框，其他设置如下图：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773795750-e7d85ff8-863e-469f-8bc2-38c1040e94fd.png" width="1268" title="" crop="0,0,1,1" id="aitO1" class="ne-image">

预览报表时，先选择需要查看的项目，点击查询，最终预览效果如下：

<img src="https://cdn.nlark.com/yuque/0/2024/png/25739734/1734773796004-d6977632-f006-4153-b8b3-25c669d67f8c.png" width="1265" title="" crop="0,0,1,1" id="Th7fJ" class="ne-image">



#### 3.2.2 