# echo "push files to Minikube..."
# kubectl apply -f ../k8s

# echo "done pushing to minikube."

# helm install online-rizz-shop . -n ors --create-namespace

echo "pushing all helm files to k8s"

#helm install online-rizz-shop ..\myOwnVersionOfHelm\ -n ors --create-namespace

echo "done pushing"

# minikube service mongo -n ors # start tunnel / port forwarding
# minikube service postgres -n ors # start tunnel / port forwarding
# minikube service rabbitmq -n ors # start tunnel / port forwarding
# minikube service client -n ors # start tunnel / port forwarding

# helm upgrade --install ors ..\myOwnVersionOfHelm\ -f ..\myOwnVersionOfHelm\values.yaml                       

# helm upgrade --install ors ..\myOwnVersionOfHelm\ -f ..\myOwnVersionOfHelm\values.yaml --namespace ors

# helm upgrade --install online-rizz-shop . \
#   --namespace rizz \
#   --values values.yaml \
#   --dry-run

helm install online-rizz-shop ..\myOwnVersionOfHelm\ -n ors --create-namespace

#helm install online-rizz-shop ..\myOwnVersionOfHelm\ -n ors --create-namespace

# helm upgrade online-rizz-shop ./myOwnVersionOfHelm/ -n ors