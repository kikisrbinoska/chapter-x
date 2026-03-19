using MediatR;

namespace ChapterX.Application.Notify.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
