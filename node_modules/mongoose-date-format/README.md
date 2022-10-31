# mongoose-date-format

### INSTALL
```
npm install mongoose-date-format --save
```

### USE

#### 1. define schema:
```
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    birthdate: { type: Date, default: new Date() },
    ...
  });

  return mongoose.model('User', UserSchema);
};

```
#### 2. added plugin:
```
'use strict';

const mongooseDateFormat = require('mongoose-date-format');

module.exports = app => {
  const mongoose = app.mongoose;

  const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    ...
  });
  
  UserSchema.plugin(mongooseDateFormat);  // format: YYYY-MM-DD HH:mm:ss
  return mongoose.model('User', UserSchema);
};
```

#### 3. response format:
```
{
  username: 'test',
  birthdate: '2018-02-12 19:23:45',
  ...
}
```
