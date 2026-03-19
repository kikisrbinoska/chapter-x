using MediatR;

namespace ChapterX.Application.Auth
{
    public record LoginRequest(string Email, string Password) : IRequest<LoginResponse>;
}
