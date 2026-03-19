using MediatR;

namespace ChapterX.Application.Auth
{
    public record RegisterRequest(string Username, string Email, string Name, string Surname, string Password) : IRequest<RegisterResponse>;
}
