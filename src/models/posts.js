const formatDate = require('service/formatDate');
const mongoose = require('mongoose');

const salaryFieldsValidator = function () {
  const hourlySalarySet = !!this.hourlySalary;
  const dailySalarySet = !!this.dailySalary;
  const monthlySalarySet = !!this.monthlySalary;

  if (!hourlySalarySet && !dailySalarySet && !monthlySalarySet) {
    throw new Error('請至少填寫「月薪」、「時薪」或「日薪」其中一項');
  }
};

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
      required: function () {
        return !!this.hourlySalary;
      },
    },
    avgWorkingDaysPerMonth: {
      type: Number,
      required: function () {
        return !!this.hourlySalary || !!this.dailySalary;
      },
    },
    hourlySalary: {
      type: Number,
      validate: salaryFieldsValidator,
    },
    dailySalary: {
      type: Number,
      validate: salaryFieldsValidator,
    },
    monthlySalary: {
      type: Number,
      validate: salaryFieldsValidator,
    },
    yearlySalary: {
      type: Number,
      required: [true, '請輸入您的年薪'],
    },
    yearEndBonus: {
      type: Number,
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
    customTags: {
      type: [String],
    },
    unlockedUsers: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
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
    seen: {
      type: Number,
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

postSchema.path('createdAt').get(function (date) {
  return formatDate(date);
});

postSchema.path('updatedAt').get(function (date) {
  return formatDate(date);
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
