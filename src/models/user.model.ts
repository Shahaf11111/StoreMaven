import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class User {
  @prop({ type: String, required: true, unique: true })
  public username: string;

  @prop({ type: Number, default: 0 })
  public score: number;

  public createdAt?: Date;

  public updatedAt?: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
