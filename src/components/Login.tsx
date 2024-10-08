import React, { useState } from "react";
import { Button, Card, Stack, TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../socket";

const Login = () => {
  const [searchParams] = useSearchParams();
  const queryParamGameId = searchParams.get("gameId");
  const [gameId, setGameId] = useState<string>(queryParamGameId || "");
  const [localUsername, setLocalUsername] = useState<string>("");

  const navigate = useNavigate();

  const joinGame = () => {
    socket
      .emitWithAck("join-game", {
        gameId: gameId,
        playerName: localUsername,
      })
      .then(() => {
        navigate("/lobby");
      });
  };

  return (
    <Stack
      sx={{ position: "relative", top: "8em" }}
      alignItems={"center"}
      spacing={18}
    >
      <div>
        <img
          src="/music-master-logo-small.svg"
          alt={"logo"}
          className={"background"}
        />
      </div>
      <Card>
        <Stack alignItems={"center"} spacing={2} padding={3}>
          {
            <TextField
              disabled={!!queryParamGameId}
              value={gameId}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setGameId(event.target.value);
              }}
              placeholder={"Enter PIN"}
              variant="standard"
              inputProps={{ inputMode: "numeric", maxLength: 6 }}
            />
          }
          <TextField
            value={localUsername}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLocalUsername(event.target.value);
            }}
            placeholder={"Enter name"}
            variant="standard"
          />
          <Button onClick={joinGame}>Submit</Button>
        </Stack>
      </Card>
    </Stack>
  );
};

export default Login;
