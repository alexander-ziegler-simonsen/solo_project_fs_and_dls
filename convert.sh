echo "converting docker compose to kubernetes YAML, with Kompose and putting all them in a folder called 'k8s/'"
kompose convert --out k8s/

echo "done converting."