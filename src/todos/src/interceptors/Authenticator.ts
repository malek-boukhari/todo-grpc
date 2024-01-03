import * as grpc from '@grpc/grpc-js';
import { ServerUnaryCall } from '@grpc/grpc-js';
import jwt from 'jsonwebtoken';

// Custom decorator to intercept and validate the token in the request metadata
export function authenticate(
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
): void {
    const originalMethod = descriptor.value;

    descriptor.value = function (call: ServerUnaryCall<any, any>, callback: any) {
        const header: grpc.MetadataValue | null = call.metadata.get('authorization')[0];

        if (!header) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: 'No token provided'
            });
            return;
        }
        const bearer = header.toString().split(' ');
        const token = bearer[1];

        try {
            jwt.verify(token, process.env.BEARER_SECRET);
        } catch (e) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: 'The token is not valid'
            });
        }

        // Call the original method with authentication checks
        originalMethod.call(this, call, callback);
    };
}
