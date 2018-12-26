# DOCKER DEPLOYMENT

## DOCKER-COMPOSE
  - see release v1

#### CI/CD pipeline flow

  1. Github
  2. Travis-CI
  3. Docker Hub
  4. Amazon AWS

#### TODO: more info

## KUBERNETES

#### TODO: more info

## USEFUL COMMANDS

#### Docker

```bash
docker ps --all
docker build -t <tag-name> <dockerfile-dir>
docker run -p <port:port> -d <image-tag>
docker logs -f <container-id>
docker exec -it <container-id> sh
```

  - Delete docker image cache
```bash
docker system prune
```

  - Push docker image to docker hub repo
```bash
docker push <username>/<image-tag>:<version>
docker push ae1663830a/multi-frontend:1.0.0
```
#### Docker Compose

```bash
docker-compose ps
docker-compose up --build
docker-compose down
```

#### Kubernetes

Get information about cluster
```bash
kubectl cluster-info
```

Apply changes which have been made in k8s configuration file
```bash
kubectl apply -f <k8s-config-file>.yaml
```

Get status of k8s object, can be used with key `-o wide` to get detailed info
```bash
kubectl get <kind-name>
kubectl get deployments
kubectl get pods
kubectl get pods -o wide
```

Get description of k8s object
```bash
kubectl describe <kind-name>
```

Delete object which was created given file
```bash
kubectl delete -f <k8s-config-file>.yaml
kubectl delete -f frontend-pod.yaml
```

Delete k8s object
```bash
kubectl delete <kind-name> <tag>
kubectl delete pod frontend-deployment-764d755d97-jcz85
```

Update image version in k8s
```bash
kubectl set image <kind-name>/<kind-metadata-name> <container-name>=<image-tag>
kubectl set image deployment/frontend-deployment frontend=ae1663830a/multi-frontend:1.0.1
```

Switch to minikube's docker CLI
```bash
eval $(minikube docker-env)
```

Get pod logs, can be used with `-f` to follow, `--timestamps` to show timestamps
```bash
kubectl logs -f <pod-name> --timestamps
kubectl logs -f frontend-deployment-6c4c67957f-m5sck --timestamps
```

Enter to container's shell
```bash
kubectl exec -it <pod-name> /bin/bash
kubectl exec -it frontend-deployment-6c4c67957f-m5sck /bin/bash
```

Get information of persistent volumes `pv` or persistent volume claims `pvc`
```bash
kubectl get pv
kubectl describe pv
```

Creating a k8s object as an example creation of a secret to store env variable PGPASSWORD
```bash
kubectl create secret <type> <secret-name> --from-literal <key>=<value>
kubectl create secret generic pgpassword --from-literal PGPASSWORD=<password>
```

## USEFUL LINKS

#### Docker Compose
  - [Docker compose documentation](https://docs.docker.com/compose/)
  - [Docker compose tutorial](https://www.baeldung.com/dockerizing-spring-boot-application)
  - [Travic-CI documentation](https://docs.travis-ci.com/)
  - [AWS Container Definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions)

#### Kubernetes

  - [Kubernetes setup](https://kubernetes.io/docs/setup/)
  - [Kubernetes persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)