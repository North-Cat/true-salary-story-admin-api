const mongoose = require('mongoose');
// TODO: 確認必填欄位
const postSchema = new mongoose.Schema({
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
  avgHoursPerday: {
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
    type: String,
    enum: ['準時上下班', '很少加班', '偶爾加班', '常常加班', '賣肝拼經濟'],
    required: [true, '請輸入您的加班頻率'],
    default: '很少加班',
  },
  feeling: {
    type: String,
    enum: ['非常開心', '還算愉快', '平常心', '有苦說不出', '想換工作了'],
    required: [true, '請輸入您的上班心情'],
    default: '還算愉快',
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
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  updateUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
