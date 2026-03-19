using MediatR;

namespace ChapterX.Application.User.Commands
{
    public record AddRequest(string Username, string Email, string Name, string Surname, string Password) : IRequest<AddResponse>;
}
