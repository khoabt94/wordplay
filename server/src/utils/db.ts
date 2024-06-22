import mongoose from 'mongoose'


export default (databaseUrl: string) => {
  mongoose.connect(databaseUrl).then(() => console.log('Connected DB!'))
  mongoose.connection.on('error', err => console.log(err))
}