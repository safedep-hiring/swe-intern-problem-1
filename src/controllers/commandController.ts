import { Request, Response } from 'express';
import { insertCommand, searchCommands } from '../models/command';
import { prisma } from "../prismaClient";
import { date } from 'zod';

export const storeCommand = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Extract command from different possible request body formats
    let command: string | undefined;

    // Check JSON body
    if (req.body.command) {
      command = req.body.command;
    } 
    // Check if command is directly in the body (for x-www-form-urlencoded)
    else if (req.body) {
      command = req.body;
    }

    if (typeof command === 'object' && command !== null) {
      command = (command as { command?: string }).command || undefined;
    }

    // Validate command
    if (!command || command.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Command must be at least 2 characters long',
        receivedBody: req.body
      });
    }

    // Save command
    const savedCommand = await prisma.command.create({
      data: { command: command.trim() }
    });

    return res.status(201).json(savedCommand);
  } catch (error) {
    console.error('Error in storeCommand:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};


export const searchCommand = async (req: Request, res: Response): Promise<Response> => {
  try {
    const keyword = req.query.keyword as string;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    const results = await prisma.command.findMany({
      where:{
        command:{
          contains:keyword,
          mode:"insensitive"
        },
      },
      orderBy:{
        created_at:"desc",
      },
    });
    return res.status(200).json(results);
  } catch (error) {
    console.error('Error in searchCommmand:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
