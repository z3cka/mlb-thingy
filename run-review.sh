echo "checking for existance of the atdprn container"
if [ "$(docker ps -q -f name=atdprn)" ]
  then
    echo "stopping found atdprn running container"
    docker stop atdprn
    if [ "$(docker ps -aq -f status=exited -f name=atdprn)" ]
      then
        # cleanup
        docker rm atdprn
    fi
    # run container
    docker run -d --name atdprn -P -p 58416:80 z3cka/atdprn
  else
    echo "no running container in the way, checking for stopped container"
    if [ "$(docker ps -a -q -f name=atdprn)" ]
      then
        echo "stopped container found, removing"
        docker rm atdprn
    fi
    echo "running new atdprn container"
    docker run -d --name atdprn -P -p 58416:80 z3cka/atdprn
fi
