using MediatR;

namespace ChapterX.Application.Collaboration.Commands
{
    public record UpdateRequest(int Id, string Role) : IRequest<UpdateResponse>;
}
