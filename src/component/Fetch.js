import $ from 'jquery'
// const data_base = 'http://192.168.3.7:8080/api/';
// const data_base = 'http://localhost:8080/api/';
const data_base = 'http://39.108.68.148:8080/api/';

localStorage.setItem("servie_ip",'http://39.108.68.148:8080/');
export const login = (username, password) => {
          let body = 'name=' + username;
          body += '&password=' + password;
          return new Promise((resolve, reject) => {
               fetch(data_base + 'accesstoken/', {
                    method: 'POST',
                    body: body,
                    headers: {
                         "Content-Type": "application/x-www-form-urlencoded",
                         // 'Authorization': ''
                    },
               }).then((res) => {
                    // console.log(res)

                    if (res.ok) {
                         // console.log(res.json())
                         return res.json().then((data) => {

                              resolve(data);
                         })
                    } else {
                         reject(res.status);
                    }

               }).catch((err) => {
                    reject(err);
               })
          });
     }
     //图床
export const uploadImage = (formdata) => {
     return new Promise((resolve, reject) => {
     let getData = false;
     $.ajax({
          url: "https://sm.ms/api/upload",
          headers: {
               'Content-Type': undefined
          },
          data: formdata,
          type: 'POST',
          contentType: false,
          processData: false,
          // async: false,
          success: function(data) {
               getData = data.data;
               resolve(getData);
          },
          error: function(data) {
               reject('');
               // console.log(data);
          }
     });
 
     });

}
export const seeFile = (id) => {
     return new Promise((resolve, reject) => {
          fetch(data_base + 'seeFile/' + id, {
               method: 'POST',
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    // 'Authorization': ''
               },
          }).then((res) => {
               if (res.ok) {
                    return res.json().then((data) => {
                         resolve(data);
                    })
               } else {
                    resolve([]);
               }

          }).catch((err) => {
               resolve([]);
          })
     });
}
export const signup = (username, password, email) => {
     let body = 'name=' + username;
     body += '&password=' + password;
     body += '&email=' + email;
     return new Promise((resolve, reject) => {
          fetch(data_base + 'signup/', {
               method: 'POST',
               body: body,
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    // 'Authorization': ''
               },
          }).then((res) => {
               if (res.ok) {
                    return res.json().then((data) => {
                         resolve(data);
                    })
               } else {
                    resolve([]);
               }

          }).catch((err) => {
               resolve([]);
          })
     });
}

export const exit = () => {

     fetch(data_base + 'exit', {
               method: 'POST',
               headers: {
                    'Authorization': localStorage.getItem("userToken")

               },
          })
          .then((res) => {


          })
          .catch((err) => {


          })

}
export const getLocalTime = (nS) => {
     return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

export const idToFile = (id) => {
     return new Promise((resolve, reject) => {
          fetch(data_base + 'file?id=' + id, {
                    method: 'GET',
                    headers: {
                         'Authorization': localStorage.getItem("userToken")

                    },
               })
               .then((res) => {

                    if (res.ok) {
                         return res.json().then((data) => {

                              data.datetime = getLocalTime(data.datetime);
                              resolve(data);
                         })
                    } else {
                         resolve([]);

                    }
               })
               .catch((err) => {

                    resolve([]);
               })
     })
}

export const collegeCourse = (kind) => {
     return new Promise((resolve, reject) => {
          fetch(data_base + 'file_list?grade=' + kind, {
                    method: 'GET',
                    headers: {
                         'Authorization': localStorage.getItem("userToken")

                    },
               })
               .then((res) => {

                    if (res.ok) {
                         return res.json().then((data) => {
                              for (let i in data) {
                                   data[i].datetime = getLocalTime(data[i].datetime)
                              }

                              resolve(data);
                         })
                    } else {
                         resolve([]);

                    }
               })
               .catch((err) => {

                    resolve([])
               })
     })
}

// 用户列表
export const userList = () => {
     return new Promise((resolve, reject) => {
          fetch(data_base + 'users', {
               method: 'GET',
               headers: {
                    'Authorization': localStorage.getItem("userToken")
               }
          }).then((res) => {
               if (res.ok) {
                    return res.json().then((data) => {

                         resolve(data);
                    })
               } else {
                    resolve([]);
               }
          }).catch((err) => {
               resolve([])
          })
     })
}

// 删除用户
export const deletUser = (name) => {
          return new Promise((resolve, reject) => {
               let body;
               body = 'name=' + name;
               fetch(data_base + 'user', {
                    method: 'DELETE',
                    body: body,
                    headers: {
                         'Authorization': localStorage.getItem('userToken'),
                         'Content-Type': 'application/x-www-form-urlencoded'
                    }
               }).then((res) => {
                    if (res.ok) {
                         return res.json().then((data) => {
                              // console.log(data)
                              resolve(data)
                         })
                    } else {
                         resolve([])
                    }
               }).catch((err) => {
                    resolve([])
               })
          });
     }
     // 赋予权限

export const givePermission = (name, status) => {
     let body;
     body = 'name=' + name;
     body += '&is_teacher=' + status;
     return new Promise((resolve, reject) => {
          fetch(data_base + '/is_teacher', {
                    method: 'POST',
                    body: body,
                    headers: {
                         'Authorization': localStorage.getItem('userToken'),
                         'Content-Type': 'application/x-www-form-urlencoded'
                    }
               })
               .then((res) => {
                    if (res.ok) {
                         return res.json().then((data) => {

                              resolve(data);
                         })
                    } else {
                         resolve([]);
                    }
               }).catch((err) => {
                    resolve([]);
               })
     });
}

export const addCourse = (formdata) => {


          return new Promise((resolve, reject) => {
               // fetch(data_base+'upload',{
               //      method:'POST',
               //      body:formdata,
               //      headers:{
               //           'Authorization':localStorage.getItem('userToken'),
               //           'Content-Type':'application/x-www-form-urlencoded'
               //      }
               // })
               // .then((res)=>{
               //      if(res.ok){
               //           return res.json().then((data)=>{
               //             resolve(data);
               //           })
               //      }
               //      else{
               //           resolve([]);
               //      }
               // }).catch((err)=>{
               //      resolve([]);
               // })


               $.ajax({
                    url: data_base + 'upload',
                    type: 'POST',
                    data: formdata,
                    // async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(err) {
                         reject(err)
                    }
               });



          });
     }
     // 删除课程
export const deletCouser = (id) => {
     return new Promise((resolve, reject) => {
          fetch(data_base + 'file/?id=' + id, {
                    method: 'DELETE',

                    headers: {
                         'Authorization': localStorage.getItem('userToken'),

                    }
               })
               .then((res) => {
                    if (res.ok) {
                         return res.json().then((data) => {
                              resolve(data);
                         })
                    } else {
                         resolve([])
                    }
               })
               .catch((err) => {
                    resolve([])
               })
     });
}

/*发送留言*/
export const comment = (body) => {
     return new Promise((resolve, reject) => {

          fetch(data_base + 'comment', {
                    method: 'POST',
                    body: body,
                    headers: {
                         'Authorization': localStorage.getItem('userToken'),
                         "Content-Type": "application/x-www-form-urlencoded",
                    }
               })
               .then((res) => {
                    if (res.ok) {
                         return res.json().then((data) => {

                              resolve(data);
                         })
                    } else {
                         resolve([])
                    }
               })
               .catch((err) => {
                    resolve([])
               })
     });
}
export const recover = (id, body) => {
     return new Promise((resolve, reject) => {

          fetch(data_base + 'recovery/' + id, {
                    method: 'POST',
                    body: body,
                    headers: {
                         'Authorization': localStorage.getItem('userToken'),
                         "Content-Type": "application/x-www-form-urlencoded",
                    }
               })
               .then((res) => {
                    if (res.ok) {
                         return res.json().then((data) => {

                              resolve(data);
                         })
                    } else {
                         resolve([])
                    }
               })
               .catch((err) => {
                    resolve([])
               })
     });
}
export const del_comment = (id) => {
     return new Promise((resolve, reject) => {

          fetch(data_base + 'comment/' + id, {
                    method: 'DELETE',
                    headers: {
                         'Authorization': localStorage.getItem('userToken'),
                         "Content-Type": "application/x-www-form-urlencoded",
                    }
               })
               .then((res) => {
                    if (res.ok) {
                         return res.json().then((data) => {

                              resolve(data);
                         })
                    } else {
                         resolve([])
                    }
               })
               .catch((err) => {
                    resolve([])
               })
     });
}
export const getComment = (id) => {
     return new Promise((resolve, reject) => {
          fetch(data_base + 'comment/' + id, {
                    method: 'GET',
                    headers: {
                         'Authorization': localStorage.getItem("userToken"),

                    },
               })
               .then((res) => {

                    if (res.ok) {
                         return res.json().then((data) => {

                              for (let i = 0; i < data.length; i++) {
                                   data[i].datetime = getLocalTime(data[i].datetime)
                                   for (let j in data[i].Recovery) {
                                        data[i].Recovery[j].datetime = getLocalTime(data[i].Recovery[j].datetime)
                                   }
                              }

                              resolve(data);
                         })
                    } else {
                         resolve([]);

                    }
               })
               .catch((err) => {

                    resolve([]);
               })
     })
}


// comment('5917b42951da0b6f9ebc9cea','admin','你好')