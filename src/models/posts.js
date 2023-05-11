const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '請輸入您的職位'],
    },
    companyName: {
      type: String,
      required: [true, '請輸入您的公司名稱'],
    },
    taxId: {
      type: String,
    },
    type: {
      type: String,
      enum: ['全職', '兼職', '實習', '約聘', '派遣'],
      default: '全職',
      required: [true, '請輸入您的職務類別'],
    },
    inService: {
      type: Boolean,
      default: true,
    },
    city: {
      type: String,
      required: [true, '請輸入您工作的城市'],
    },
    workYears: {
      type: Number,
      required: [true, '請輸入您的在職年資'],
    },
    totalWorkYears: {
      type: Number,
      required: [true, '請輸入您的總年資'],
    },
    avgHoursPerDay: {
      type: Number,
      required: [true, '請輸入您的日均工時'],
    },
    monthlySalary: {
      type: Number,
      required: [true, '請輸入您的月薪'],
    },
    yearlySalary: {
      type: Number,
      required: [true, '請輸入您的年薪'],
    },
    holidayBonus: {
      type: Number,
    },
    profitSharingBonus: {
      type: Number,
    },
    otherBonus: {
      type: Number,
    },
    overtime: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, '請輸入您的加班頻率'],
      default: 2,
    },
    feeling: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, '請輸入您的上班心情'],
      default: 2,
    },
    jobDescription: {
      type: String,
      required: [true, '請輸入您的工作內容'],
    },
    suggestion: {
      type: String,
      required: [true, '請輸入您的建議'],
    },
    tags: {
      type: [String],
    },
    unlockedUsers: {
      type: [String],
      select: false,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'removed'],
    },
    rejectReason: {
      type: String,
      required: function () {
        return this.status === 'rejected';
      },
    },
    updateUser: {
      type: mongoose.Schema.ObjectId,
      ref: 'Admin',
    },
  },
  { timestamps: true },
);

postSchema.set('toJSON', {
  getters: true,
});

postSchema.path('overtime').get(function (num) {
  const overtimeMap = {
    1: '準時上下班',
    2: '很少加班',
    3: '偶爾加班',
    4: '常常加班',
    5: '賣肝拼經濟',
  };
  return overtimeMap[num];
});

postSchema.path('feeling').get(function (num) {
  const feelingMap = {
    1: '非常開心',
    2: '還算愉快',
    3: '平常心',
    4: '有苦說不出',
    5: '想換工作了',
  };
  return feelingMap[num];
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
