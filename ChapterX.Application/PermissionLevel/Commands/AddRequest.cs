using MediatR;
using PermissionLevelEnum = ChapterX.Domain.Entities.PermissionLevel;

namespace ChapterX.Application.PermissionLevel.Commands
{
    public record AddRequest(PermissionLevelEnum Value) : IRequest<AddResponse>;
}
