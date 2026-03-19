using MediatR;

namespace ChapterX.Application.User.Commands
{
    public record UpdateRequest(int Id, string Username, string Email, string Name, string Surname) : IRequest<UpdateResponse>;
}
