import axios from 'axios'
import router from '../router'
import md5 from 'md5'
const User = {
  data: {},
  permission: {
    h_home: true,
    h_profile: false,
    h_logout: true,
    h_table: true,
    h_account: true,
    h_contact: false,
    h_friends: true
    // EW049949983TH
  },
  authen: {
    username: null,
    password: null
  },
  methods: {
    // make_token () {
    //   let text = ''
    //   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    //   for (let i = 0; i < 20; i++) {
    //     text += possible.charAt(Math.floor(Math.random() * possible.length))
    //   }
    //   return text
    // },
    doToken () {
      console.log('HAHAHA')
      if (User.data.username) {
      } else {
        console.log('DSADSA')
        if (localStorage.getItem('user-token')) {
          // let bodyFormData = new FormData()
          // bodyFormData.set('router', 'm_authenToken')
          // bodyFormData.set('token', localStorage.getItem('user-token'))
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token')
          axios({
            method: 'GET',
            url: 'http://192.168.4.12:9999/api/v1/authen',
            // data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': localStorage.getItem('user-token') } }
          }).then(res => {
            console.log(res.data.rows[0])
            // console.log('DSADAS')
            User.methods.permission(res.data.rows[0])
          }).then(() => {
            if (router.currentRoute.name === 'Login') {
              router.replace(`/`)
            }
          }).catch(e => {
            console.log(e)
          })
        } else {
          router.replace(`/login`)
        }
      }
    },
    doLogin () {
      // let token = User.methods.make_token()
      // let bodyFormData = new FormData()
      // bodyFormData.set('router', 'test_md5')
      // bodyFormData.set('username', User.authen.username)
      // bodyFormData.set('password', User.authen.password)
      // bodyFormData.set('token', token)
      axios({
        method: 'GET',
        url: `http://192.168.4.12:9999/api/v1/authen/${User.authen.username}/${md5(User.authen.password)}`,
        // data: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then(res => {
        // console.log(res.data.rows.token)
        localStorage.setItem('user-token', res.data.rows.token)
        User.methods.doToken()
      }).then(() => {
        if (router.currentRoute.name === 'Login') {
          router.replace(`/`)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    permission (v) {
      User.data = v
      User.permission.h_home = false
      User.permission.h_profile = false
      User.permission.h_logout = false
      User.permission.h_table = false
      User.permission.h_account = false
      User.permission.h_contact = false
      User.permission.h_friends = false
    },
    doLogout () {
      User.data = {}
      User.permission.h_home = true
      User.permission.h_profile = false
      User.permission.h_logout = true
      User.permission.h_table = true
      User.permission.h_account = true
      User.permission.h_contact = true
      User.permission.h_friends = true
      localStorage.removeItem('user-token')
      router.replace(`/login`)
    }
  }
}
export default User
