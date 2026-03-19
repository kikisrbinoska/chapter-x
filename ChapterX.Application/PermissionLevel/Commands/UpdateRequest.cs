using MediatR;

namespace ChapterX.Application.PermissionLevel.Commands
{
    public record UpdateRequest(int Id) : IRequest<UpdateResponse>;
}
