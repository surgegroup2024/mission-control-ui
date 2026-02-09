// OpenClaw Agent Types for dynamic agent creation

export interface OpenClawAgentWorkspaceFile {
    filename: string;
    content: string;
}

export interface OpenClawAgentConfig {
    /** Unique agent name (used as identifier) */
    name: string;
    /** Workspace path where agent files are stored */
    workspace: string;
    /** Agent personality and behavior (SOUL.md content) */
    soulMd: string;
    /** Safety rules and capability constraints (AGENTS.md content) */
    agentsMd?: string;
    /** Agent identity (IDENTITY.md content) */
    identityMd?: string;
    /** Tools configuration (TOOLS.md content) */
    toolsMd?: string;
}

export interface OpenClawAgentCreateResult {
    success: boolean;
    agentName: string;
    workspace: string;
    error?: string;
}

export interface OpenClawAgentInfo {
    name: string;
    workspace: string;
    isDefault?: boolean;
}

/**
 * Generates SOUL.md content from planning output
 */
export function generateSoulMd(params: {
    name: string;
    role: string;
    soul_md?: string;
    instructions?: string;
    avatarEmoji?: string;
}): string {
    const { name, role, soul_md, instructions, avatarEmoji } = params;

    return `# ${avatarEmoji || '🤖'} ${name}

## Role
${role}

## Personality
${soul_md || `You are ${name}, a specialized AI agent focused on ${role.toLowerCase()}.`}

## Instructions
${instructions || 'Complete tasks efficiently and report progress clearly.'}

## Core Behaviors
- Be proactive and complete tasks thoroughly
- Report progress via Mission Control API calls
- Ask for clarification when requirements are unclear
- Save all deliverables to the designated project directory
`;
}

/**
 * Generates AGENTS.md content with safety rules
 */
export function generateAgentsMd(params: {
    name: string;
    role: string;
    taskTitle?: string;
}): string {
    const { name, role, taskTitle } = params;

    return `# Agent Safety Rules for ${name}

## Authorized Actions
- Read and write files in the project workspace
- Execute code and scripts related to ${role.toLowerCase()}
- Make API calls to Mission Control for status updates
${taskTitle ? `- Complete work related to: ${taskTitle}` : ''}

## Confirmation Required
- Installing new system packages
- Modifying files outside the project directory
- Making external API calls to third-party services
- Deleting or overwriting existing important files

## Prohibited Actions
- Accessing credentials or secrets not explicitly provided
- Modifying system configuration files
- Running commands that could affect system stability
- Sharing sensitive information outside Mission Control

## Mission Control Integration
When completing work, always call:
1. POST /api/tasks/{id}/activities - Log activity
2. POST /api/tasks/{id}/deliverables - Register outputs
3. PATCH /api/tasks/{id} - Update task status
`;
}

/**
 * Generates IDENTITY.md content
 */
export function generateIdentityMd(params: {
    name: string;
    role: string;
    avatarEmoji?: string;
}): string {
    const { name, role, avatarEmoji } = params;

    return `# Identity

**Name:** ${name}
**Role:** ${role}
**Avatar:** ${avatarEmoji || '🤖'}

This agent was automatically created by Mission Control during task planning.
`;
}
