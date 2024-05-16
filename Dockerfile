FROM ghcr.io/railwayapp/nixpacks:ubuntu-1711411379

ENTRYPOINT ["/bin/bash", "-l", "-c"]
WORKDIR /app/


COPY .nixpacks/nixpkgs-bf744fe90419885eefced41b3e5ae442d732712d.nix .nixpacks/nixpkgs-bf744fe90419885eefced41b3e5ae442d732712d.nix
RUN nix-env -if .nixpacks/nixpkgs-bf744fe90419885eefced41b3e5ae442d732712d.nix && nix-collect-garbage -d


ARG CI NIXPACKS_METADATA NODE_ENV NPM_CONFIG_PRODUCTION
ENV CI=$CI NIXPACKS_METADATA=$NIXPACKS_METADATA NODE_ENV=$NODE_ENV NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION

# setup phase
# noop

# install phase
ENV NIXPACKS_PATH /app/node_modules/.bin:$NIXPACKS_PATH
COPY . /app/.
RUN --mount=type=cache,id=PfC9ThR019o-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile

# build phase
COPY . /app/.
RUN --mount=type=cache,id=PfC9ThR019o-node_modules/cache,target=/app/node_modules/.cache yarn run build


RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile


# start
COPY . /app
CMD ["node .output/server/index.mjs"]

