# 🔐 Security Credential Rotation Guide

## ⚠️ CRITICAL - Your MongoDB Atlas and Cloudinary credentials have been exposed in git history!

Follow these steps **IMMEDIATELY** to rotate all compromised credentials:

---

## 📋 Table of Contents
1. [MongoDB Atlas Credential Rotation](#mongodb-atlas-credential-rotation)
2. [Cloudinary API Key Rotation](#cloudinary-api-key-rotation)
3. [JWT Secret Generation](#jwt-secret-generation)
4. [Update Local Environment](#update-local-environment)
5. [Deploy New Credentials](#deploy-new-credentials)

---

## 🔄 MongoDB Atlas Credential Rotation

### **COMPROMISED ACCOUNT:**
- **Username:** `arpitmishra0925_db_user`
- **Status:** DELETE THIS USER IMMEDIATELY

### **Step 1: Create New Database User**

1. Go to **MongoDB Atlas Dashboard**: https://cloud.mongodb.com
2. Sign in with your account
3. Navigate to your cluster
4. Click **"Security"** → **"Database Access"** (left sidebar)
5. Click **"+ Add New Database User"** button
6. Fill in the details:
   - **Authentication Method:** Password
   - **Username:** `chat_app_user` (new, secure username)
   - **Password:** Generate a strong password
     - Use: https://www.random.org/strings/ or generate using Node.js:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - **Database User Privileges:** Select "Atlas Admin" or specific cluster access
7. Click **"Add User"**
8. **SAVE THE NEW PASSWORD** - you won't see it again!

### **Step 2: Delete Compromised User**

1. In **Database Access** page, find user `arpitmishra0925_db_user`
2. Click the **"..."** (three dots) next to it
3. Click **"Delete"**
4. Type the username to confirm deletion
5. Click **"Delete User"**

### **Step 3: Update Connection String**

1. Go to **Databases** page
2. Click **"Connect"** on your cluster
3. Select **"Drivers"** → **"Node.js"**
4. Copy the connection string
5. Replace `<username>` and `<password>` with your NEW credentials

**Example (replace values):**
```
mongodb+srv://chat_app_user:YOUR_NEW_PASSWORD_HERE@cluster0.lqky7f7.mongodb.net/chat_db?appName=Cluster0
```

### **Step 4: Whitelist Your IP (if needed)**

1. Go to **Security** → **Network Access**
2. Click **"+ Add IP Address"**
3. Select **"Add Current IP Address"** or **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

**Note:** For production, use specific IP addresses instead of 0.0.0.0/0

---

## 🌥️ Cloudinary API Key Rotation

### **COMPROMISED CREDENTIALS:**
- **API Key:** `764929466552692`
- **Cloud Name:** `dsbhhogzi`
- **Status:** REGENERATE API SECRET IMMEDIATELY

### **Step 1: Generate New Credentials**

1. Go to **Cloudinary Dashboard**: https://cloudinary.com/console
2. Sign in with your account
3. Navigate to **"Settings"** → **"API Keys"** (bottom left)
4. Click **"Generate new API secret"** button
5. Confirm the action (this invalidates the old secret)
6. **SAVE THE NEW API SECRET** - copy and store it securely

**Note:** You cannot recover the old secret - this is intentional for security

### **Step 2: Verify Access**

1. Copy your new credentials:
   - **Cloud Name:** (visible on dashboard)
   - **API Key:** (visible on dashboard)
   - **API Secret:** (newly generated)

2. Test the connection with your backend:
```bash
cd backend
npm start
```

If you see: `⚠️  WARNING: Cloudinary credentials are not set` - credentials are missing in .env

### **Step 3: Update in Production**

Update your deployment platform (Heroku, Railway, Vercel, etc.) with new credentials:

**Heroku Example:**
```bash
heroku config:set CLOUDINARY_API_SECRET=your_new_secret
```

**Railway/Others:** Update through their dashboard

---

## 🔑 JWT Secret Generation

### **Current Compromised Secret:**
- **JWT_SECRET:** `arpitmishra` (CHANGE THIS!)

### **Generate New JWT Secret**

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -hex 32
```

**Option 3: Online Generator**
- https://generate.plus/en/base64

**Example Output:**
```
a7f3b2c9d1e4f6g8h0i2j4k6l8m0n2o4p6q8r0s2t4u6v8w0x2y4z6
```

**Store this somewhere safe** (1Password, LastPass, etc.)

---

## 🔧 Update Local Environment

### **Step 1: Create/Update `.env` file**

Create or update `backend/.env` with your NEW credentials:

```env
# MongoDB Configuration - NEW CREDENTIALS
MONGODB_URI=mongodb+srv://chat_app_user:YOUR_NEW_PASSWORD_HERE@cluster0.lqky7f7.mongodb.net/chat_db?appName=Cluster0

# Server Configuration
PORT=5001

# JWT Configuration - NEW SECRET
JWT_SECRET=your_new_jwt_secret_here_generated_above

# Cloudinary Configuration - NEW CREDENTIALS
CLOUDINARY_CLOUD_NAME=dsbhhogzi
CLOUDINARY_API_KEY=764929466552692
CLOUDINARY_API_SECRET=your_new_cloudinary_api_secret_here

# Node Environment
NODE_ENV=development
```

### **Step 2: Test Local Connection**

```bash
cd backend
npm install
npm run dev
```

**Expected output:**
```
MongoDB connected: cluster0.xxxxx.mongodb.net
server is running on PORT:5001
```

If you get errors:
- ❌ MongoDB connection error → Check MONGODB_URI format
- ❌ Cloudinary warning → Check CLOUDINARY credentials

### **Step 3: Verify .env is in .gitignore**

```bash
cat .gitignore | grep ".env"
```

Should show:
```
.env
.env.*
!.env.example
```

---

## 🚀 Deploy New Credentials

### **For Heroku:**

```bash
# Set MongoDB URI
heroku config:set MONGODB_URI="mongodb+srv://chat_app_user:YOUR_PASSWORD@cluster0.lqky7f7.mongodb.net/chat_db"

# Set JWT Secret
heroku config:set JWT_SECRET="your_new_jwt_secret"

# Set Cloudinary credentials
heroku config:set CLOUDINARY_CLOUD_NAME="dsbhhogzi"
heroku config:set CLOUDINARY_API_KEY="764929466552692"
heroku config:set CLOUDINARY_API_SECRET="your_new_secret"

# Verify
heroku config
```

### **For Railway/Similar Platforms:**

1. Go to your project dashboard
2. Navigate to **Environment** or **Variables**
3. Update each variable with new values:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_API_SECRET`
4. Redeploy the application

### **For Docker/Self-hosted:**

1. Update your `.env` file on the server
2. Restart the Docker container:
```bash
docker-compose down
docker-compose up -d
```

---

## ✅ Verification Checklist

After rotation, verify everything works:

- [ ] **Local Backend:** `npm run dev` connects to MongoDB successfully
- [ ] **Profile Photo Upload:** Upload works in frontend
- [ ] **Message Sending:** Can send messages without errors
- [ ] **JWT Token:** Users can log in and stay logged in
- [ ] **Production:** App works in production environment
- [ ] **Old Credentials:** Verified deleted/disabled on MongoDB Atlas
- [ ] **Cloudinary:** Old API secret is no longer valid

---

## 🔒 Security Best Practices Going Forward

1. **Never commit `.env` files** to git
2. **Use strong passwords** - at least 32 characters
3. **Rotate credentials every 90 days** in production
4. **Use separate credentials** for development and production
5. **Store credentials in vault** (1Password, HashiCorp Vault, etc.)
6. **Enable 2FA** on MongoDB Atlas and Cloudinary accounts
7. **Review git history regularly** for exposed secrets
8. **Use GitHub secret scanning** - it will alert you

---

## 📞 Troubleshooting

### **MongoDB Connection Error**
```
Error: connection error: MongoServerError: bad auth
```
**Fix:** Check username/password in MONGODB_URI - verify no special characters need URL encoding

### **Cloudinary Upload Error**
```
Error: 401 Unauthorized
```
**Fix:** Verify new API key and secret are correctly set in .env

### **JWT Token Issues**
```
Error: invalid token
```
**Fix:** Users may need to re-login after JWT_SECRET change

---

## 🎉 You're Done!

Once all credentials are rotated and verified:
1. Your application is secure
2. Old exposed credentials are invalid
3. New credentials are generated and safe

**Remember:** This credential rotation should be done immediately!
