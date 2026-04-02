import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { headers: any }>();
    const apiKey = req.headers['x-api-key'];

    // Check if the API key is present and valid
    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}


//.env
//  if (!apiKey || apiKey !== "itc-123") {
//       throw new UnauthorizedException('Invalid API key');
//     }
// it work because 
// .env cannot push in github because it is security 
