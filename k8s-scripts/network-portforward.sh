echo "we will not setup port-forwarding for some of our services"

#          namespace                        port
#                           service name
kubectl -n ors port-forward svc/api 3003:3003

echo "not sure this line is visable at all, since the port forwarding should be running all the time"