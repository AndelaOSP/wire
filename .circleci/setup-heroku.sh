#!/bin/bash
git remote add heroku https://git.heroku.com/wire-front-staging.git
wget https://cli-assets.heroku.com/branches/stable/heroku-linux-amd64.tar.gz
sudo mkdir -p /usr/local/lib /usr/local/bin
sudo tar -xvzf heroku-linux-amd64.tar.gz -C /usr/local/lib
sudo ln -s /usr/local/lib/heroku/bin/heroku /usr/local/bin/heroku

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_API_KEY
machine git.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_API_KEY
EOF

# Add heroku.com to the list of known hosts
ssh-keyscan -H heroku.com >> ~/.ssh/known_hosts

chmod 600 ~/.netrc
if [ "${CIRCLE_BRANCH}" = "staging" ] || [ "${CIRCLE_BRANCH}" = "deployment" ] ;
then
  git config --global user.email "wire@andela.com"
  git config --global user.name "Wire"
  git add -f dist server.js Procfile
  git status
  git commit -m "Deployment: Add dist folder and server"
  git push git@heroku.com:wire-front-staging.git ${CIRCLE_BRANCH}:master -f
  heroku restart
fi
