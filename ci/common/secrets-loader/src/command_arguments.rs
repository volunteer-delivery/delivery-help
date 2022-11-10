use std::env;

pub struct CommandArguments {
    pub env: String,
    pub label: String,
}

impl CommandArguments {
    pub fn new() -> CommandArguments {
        let args: Vec<String> = env::args().collect();
        CommandArguments {
            env: args[1].to_string(),
            label: args[2].to_string()
        }
    }
}
