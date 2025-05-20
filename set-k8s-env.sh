echo "seting up the env values, so it can be used in k8s...."

kubectl create secret generic my-secret --from-env-file=.env

echo "now they should all be added (if you have a .env with key-value in them)..."
echo "now run 'kubectl get secret my-secret -o yaml' to see what your secrets are called..."