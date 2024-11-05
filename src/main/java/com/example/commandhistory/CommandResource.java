package com.example.commandhistory;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/v1/commands")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CommandResource {

    @POST
    @Transactional
    public Response createCommand(Command command) {
        if (command.command == null || command.command.trim().length() < 2) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"Command must be at least 2 characters long\"}")
                    .build();
        }
        command.persist();
        return Response.status(Response.Status.CREATED).entity(command).build();
    }

    @GET
    public List<Command> searchCommands(@QueryParam("keyword") String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return Command.listAll();
        }
        return Command.findByKeyword(keyword.trim());
    }
}
