echo "printing out all your keys (you need to have added keys and have minikube running)...."

kubectl get secret app-env-secret -n ors -o yaml