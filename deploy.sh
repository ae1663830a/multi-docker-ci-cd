#!/usr/bin/env bash

# Defined in .travis.yml configuration
# GIT_SHA=$(git rev-parse HEAD)
# will be added later

# Build all images
docker build -t ae1663830a/multi-backend:latest -t ae1663830a/multi-backend:${GIT_SHA} -f ./backend/Dockerfile ./backend/
docker build -t ae1663830a/multi-frontend:latest -t ae1663830a/multi-frontend:${GIT_SHA} -f ./frontend/Dockerfile ./frontend/
docker build -t ae1663830a/multi-postgres:latest -t ae1663830a/multi-postgres:${GIT_SHA} -f ./postgres/Dockerfile ./postgres//
docker build -t ae1663830a/multi-worker:latest -t ae1663830a/multi-worker:${GIT_SHA} -f ./worker/Dockerfile ./worker/

# Push images to docker hub
docker push ae1663830a/multi-backend:latest
docker push ae1663830a/multi-frontend:latest
docker push ae1663830a/multi-postgres:latest
docker push ae1663830a/multi-worker:latest
docker push ae1663830a/multi-backend:${GIT_SHA}
docker push ae1663830a/multi-frontend:${GIT_SHA}
docker push ae1663830a/multi-postgres:${GIT_SHA}
docker push ae1663830a/multi-worker:${GIT_SHA}

# apply k8s changes
kubectl apply -f k8s

# set cluster to use newest images
kubectl set image deployments/backend-deployment backend=ae1663830a/multi-backend:${GIT_SHA}
kubectl set image deployment/frontend-deployment frontend=ae1663830a/multi-frontend:${GIT_SHA}
kubectl set image deployment/postgres-deployment postgres=ae1663830a/multi-postgres:${GIT_SHA}
kubectl set image deployment/worker-deployment worker=ae1663830a/multi-worker:${GIT_SHA}
