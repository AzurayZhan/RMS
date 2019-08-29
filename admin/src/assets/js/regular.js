function rules(obj) {
   return{
      name: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { validator: (rule, value, callback) => {
          if (/^[a-zA-Z0-9]{3,16}$/.test(value)) {
            callback();
          } else {
            callback(new Error("请输入3-16位字母、数字组成的账号"));
          }
        }, trigger: "blur" }
      ],
      pass: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { validator:(rule, value, callback) => {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value)) {
            callback();
          } else {
            callback(new Error("请输入6-18位由数字和字母组成的密码"));
          }
        }, trigger: "blur" }
      ],
      confirm: [{ validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请确认密码"));
        } else {
          if (value !== obj.user.pass) {
            callback(new Error("两次输入的密码不一致"));
          } else {
            callback()
          }
        }
      }, trigger: "blur" }],
      tel: [{ validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入手机号"));
        } else {
          if (/^1[34578]{1}\d{9}$/.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的手机号"));
          }
        }
      }, trigger: "blur" }],
      email: [
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"]
        },
        { validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error("请输入邮箱"));
          } else {
            callback()
          }
        }, trigger: "blur" }
      ],
      idx: [{ validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入身份证号"));
        } else {
          if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/) {
            callback();
          } else {
            callback(new Error("请输入正确的身份证号"));
          }
        }
      }, trigger: "blur" }],
      des: [{ validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入备注信息"));
        } else {
          callback()
        }
      }, trigger: "blur" }]
     }
   };
export default rules