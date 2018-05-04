#!/bin/bash

# Esablish important variables
DOCKER_REGISTRY=gcr.io
DEFAULT_GOOGLE_CLUSTER_NAME=wire
PROJECT_NAME=wire-frontend

COMMIT_HASH=$(git rev-parse --short HEAD)

if [ "$CIRCLE_BRANCH" == 'master' ]; then
    IMAGE_TAG=$COMMIT_HASH
    GOOGLE_CLUSTER_NAME=$DEFAULT_GOOGLE_CLUSTER_NAME
    ENVIRONMENT=production
else
    IMAGE_TAG="${CIRCLE_BRANCH}-${COMMIT_HASH}"
    GOOGLE_CLUSTER_NAME="${DEFAULT_GOOGLE_CLUSTER_NAME}-staging"
    ENVIRONMENT=staging
fi



echo "====> Installing google cloud sdk"

echo "deb http://packages.cloud.google.com/apt cloud-sdk-jessie main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update && sudo apt-get install kubectl google-cloud-sdk

echo "====> Store Sand authenticate with service account"
echo $GCLOUD_SERVICE_KEY | base64 --decode > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

echo "Configuring Google Cloud Sdk"

gcloud auth activate-service-account --key-file=${HOME}/gcloud-service-key.json
gcloud --quiet config set project ${GOOGLE_PROJECT_ID}
gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
gcloud --quiet container clusters get-credentials ${GOOGLE_CLUSTER_NAME}

echo "====> Login to docker registry"

docker login -u _json_key --password-stdin https://gcr.io < ${HOME}/gcloud-service-key.json

echo "====> Build docker image from built artifacts"

IMAGE="${DOCKER_REGISTRY}/${GOOGLE_PROJECT_ID}/${PROJECT_NAME}:${IMAGE_TAG}"

docker build -t $IMAGE .

docker push $IMAGE

# TODO: deploy built image to kubernetes cluster
DEPLOYMENT="${ENVIRONMENT}-${PROJECT_NAME}"
kubectl set image deployment/${DEPLOYMENT} frontend=${IMAGE}

if [ "$?" == "0" ]; then
    echo "Image ${IMAGE} has been successfuly deployed to ${ENVIRONMENT} environment"
else
    echo "Failed to deploy ${IMAGE} to ${ENVIRONMENT} environment"
fi
