export const consoleLogger = {
    info: (message: string) => {
        console.log(`[INFO]\t${new Date().toISOString()}\t${message}`)
    },
    warn: (message: string) => {
        console.log(`[WARN]\t${new Date().toISOString()}\t${message}`)
    },
    error: (message: string) => {
        console.log(`[ERROR]\t${new Date().toISOString()}\t${message}`)
    }
}