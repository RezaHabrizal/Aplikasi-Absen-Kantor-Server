const { Karyawan, History } = require('../models')

class Employee {
  static async login(email, password) {
    try {
      const karyawan = await Karyawan.findOne({
        where: {
          email
        }
      })
      if (karyawan) {
        return karyawan
      } else {
        const newKaryawan = await Karyawan.create({
          email,
          password
        })
        return newKaryawan
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async findAll() {
    try {
      const karyawan = await Karyawan.findAll()
      return karyawan
    } catch (err) {
      console.log(err)
    }
  }

  static async updateProfile(payload) {
    const { email, name, divisi, status } = payload
    try {
      const successEdit = await Karyawan.update({name, divisi, status}, {
        where: {
          email
        },
        returning: true
      })
      if (successEdit) {
        return successEdit[1][0]
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async updateStatus(email, status) {
    try {
      const findOne = await Karyawan.findOne({ where: { email } })
      if (findOne) {
        const updateOne = await Karyawan.update({ status }, {
          where: { email },
          returning: true
        })
        if (updateOne) {
          await History.create({karyawanEmail: email, status})
          return updateOne[1][0]
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async findHistory(email) {
    try {
      const history = await History.findAll({where: {karyawanEmail: email}})
      if (history) {
        return history
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Employee