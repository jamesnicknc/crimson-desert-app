## Repository & Deployment

- **GitHub repo**: github.com/jamesnicknc/crimson-desert-app
- **SSH**: git@github.com:jamesnicknc/crimson-desert-app.git
- **Local workspace path**: /crimson-desert-app
- **Hosting**: Vercel (auto-deploys on push to main)
- **Domain**: crimsoncompanionapp.us
- **Backend**: Supabase (PostgreSQL + Auth)

## Deploy Key (Cowork Sessions)

The workspace folder is on a Windows filesystem (OneDrive-synced), which causes git index.lock conflicts. Always push via a fresh clone in /tmp to avoid this entirely.

### Push procedure (use every time):

```bash
# 1. Set up deploy key
mkdir -p ~/.ssh && cp /sessions/sharp-vigilant-keller/mnt/crimson-desert-app/.cowork/deploy_key ~/.ssh/deploy_key && chmod 600 ~/.ssh/deploy_key

# 2. Clone fresh into /tmp
GIT_SSH_COMMAND="ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no" git clone git@github.com:jamesnicknc/crimson-desert-app.git /tmp/crimson-push

# 3. Copy changed files into the clean clone, then commit and push from there
cd /tmp/crimson-push
git config user.email "james.nick.nc@gmail.com"
git config user.name "Nick James"
# ... git add / git commit ...
GIT_SSH_COMMAND="ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no" git push origin main

# 4. Clean up
rm -rf /tmp/crimson-push
```

### Why not push directly from the workspace?
OneDrive syncs the .git folder and recreates index.lock, blocking all git write operations from the Cowork session. The /tmp clone lives entirely on the Linux VM filesystem where this never happens.

### Permanent fix (do once on Windows)
Run in PowerShell from the repo root to stop OneDrive touching .git:
```powershell
attrib +h +s .git /s /d
```