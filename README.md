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

**IMPORTANT** Setup steps:
  - kubectl apply -f k8s/
  - create environment variables
  - create secret for env passwords
  - ingress configuration (minikube)
  - install helm & ingress configuration(gcloud env)


### Start application

**IMPORTANT** Images which are used in the project must exist in [Docker Hub](https://hub.docker.com/search/?q=ae1663830a&type=image).  
Run command in the projects root directory
```bash
kubectl apply -f k8s/
```

To open application in browser as url enter minikube's ip address. Example: [192.168.99.100](https://192.168.99.100).  
Get minikube's ip address run command
```bash
minikube ip
```

To open minikube's dashboard in browser run command
```bash
minikube dashboard
```

### Kubernetes objects (kind) used in this project
#### Deployment
#### Service
  - ClusterIP
  - Ingress
#### PersistentVolumeClaim
#### Secret
  - Generic
  - DockerRegistry

### Ingress configuration on minikube

**IMPORTANT** *The following **Mandatory Command** is required for all deployments* as written in [documentation](https://kubernetes.github.io/ingress-nginx/deploy/#prerequisite-generic-deployment-command).
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
```
For development environment with `minikube` additionally run command
```bash
minikube addons enable ingress
```

#### TODO: more info


## KUBERNETES ON GOOGLE CLOUD CLUSTER

  - set project
```bash
gcloud container clusters get-credentials multi-cluster --zone europe-north1-a --project multi-docker
```

  - Create secret
```bash
kubectl create secret generic pgpassword --from-literal PGPASSWORD=<password>
```

  - Install helm
```bash
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh
chmod 700 get_helm.sh
./get_helm.sh
```
  - Creating service account for tiller enabling [Role-based Access Control](https://docs.helm.sh/using_helm/#example-service-account-with-cluster-admin-role)
```bash
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```
  - Initialize helm
```bash
helm init --service-account tiller --upgrade
```

  - Installing ingress
```bash
helm install stable/nginx-ingress --name my-nginx --set rbac.create=true
```

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
  - [Ingress nginx documentation](https://kubernetes.github.io/ingress-nginx/)
  - [Studying the K8s Ingress system](https://www.joyfulbikeshedding.com/blog/2018-03-26-studying-the-kubernetes-ingress-system.html)
  - [Using helm](https://docs.helm.sh/using_helm/)